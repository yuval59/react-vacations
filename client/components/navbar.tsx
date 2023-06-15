import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import { ROUTES } from '../constants'

type SearchProps = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}

type NavbarProps = {
  searchProps?: SearchProps
}

function NavbarComponent(props: NavbarProps) {
  const router = useRouter()

  const logout = () => {
    router.push(ROUTES.LOGIN)
  }

  const { searchProps } = props

  return (
    <div className="navbar navbar-light bg-light mb-2 d-flex justify-content-around">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      {searchProps ? (
        <div>
          <label className="me-2" htmlFor="searchBar">
            Search
          </label>
          <input
            type="text"
            id="searchBar"
            value={searchProps.search}
            onChange={({ target: { value } }) => {
              searchProps.setSearch(value)
            }}
          />
        </div>
      ) : null}
      <button className="btn btn-info" onClick={logout}>
        Log Out
      </button>
    </div>
  )
}

export default NavbarComponent
