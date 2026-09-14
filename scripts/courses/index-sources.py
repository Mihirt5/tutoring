"""Extract private, page-addressable reference text; never imported by the app."""

import argparse
import hashlib
import json
from pathlib import Path
import subprocess

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--output", required=True, type=Path)
parser.add_argument("pdfs", nargs=3, type=Path, help="AMC 8, AMC 10/12, then formula reference")
args = parser.parse_args()
repository = Path(__file__).resolve().parents[2]
destination = args.output.resolve()
if destination.is_relative_to(repository):
    raise SystemExit("Keep copyrighted reference extracts outside the repository.")
destination.mkdir(parents=True, exist_ok=True)
inventory = []
for label, pdf in zip(("amc8", "amc1012", "formulas"), args.pdfs):
    if not pdf.is_file():
        raise SystemExit(f"Missing PDF: {pdf}")
    result = subprocess.run(["pdftotext", "-layout", str(pdf), "-"], check=True, capture_output=True, text=True)
    text = result.stdout
    pages = text.split("\f")
    if not pages[-1].strip():
        pages.pop()
    (destination / f"{label}.txt").write_text(text)
    page_directory = destination / label
    page_directory.mkdir(exist_ok=True)
    for number, page in enumerate(pages, 1):
        (page_directory / f"{number:04d}.txt").write_text(page)
    inventory.append({"label": label, "filename": pdf.name, "sha256": hashlib.sha256(pdf.read_bytes()).hexdigest(), "pages": len(pages), "characters": len(text), "low_text_pages": [i for i, page in enumerate(pages, 1) if len(page.strip()) < 80]})
    print(f"{label}: {len(pages)} pages extracted privately")
(destination / "extraction-inventory.json").write_text(json.dumps(inventory, indent=2) + "\n")
print("Review concept indexes and selected page renders separately; plain text does not preserve diagrams.")
