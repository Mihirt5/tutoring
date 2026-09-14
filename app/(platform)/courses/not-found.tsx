import Link from "next/link";

export default function CourseNotFound() {
  return (
    <div className="page courses-page">
      <header className="page-head">
        <p className="eyebrow">Course not found</p>
        <h1>Let’s find your next lesson.</h1>
        <p className="page-sub">
          This course or lesson address is unavailable. You can find the current
          learning plans in Courses.
        </p>
      </header>
      <Link href="/courses" className="btn btn-solid">
        Explore courses
      </Link>
    </div>
  );
}
