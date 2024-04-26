//router link
import { Link } from "react-router-dom"

export default function ErrorPage() {
  return (
    <section>
      <div className="error-center">
        <h2>404</h2>
        <h3>Oops! Page Not Found !</h3>
        <Link to={'/home'} className='btn btn-primary'>Go To Homepage</Link>
      </div>
    </section>
  )
}
