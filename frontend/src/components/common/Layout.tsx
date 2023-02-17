import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import Transition from "./Transition";

const Layout = ({children}) => {
  return (
    <div className='layout-container'>
      <NavBar />
      <div className="layout-inner">
        <Sidebar />
        <div className='main'>
          <Transition>
            <div className="w-100">
              {children}
            </div>
          </Transition>
        </div>
      </div>
    </div>
  )
}

export default Layout;