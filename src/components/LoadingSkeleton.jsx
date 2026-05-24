export default function LoadingSkeleton() {
  return (
    <div className="skeleton-container">
      <div className="skeleton-main"></div>

      <div className="skeleton-cards">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="skeleton-forecast">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}