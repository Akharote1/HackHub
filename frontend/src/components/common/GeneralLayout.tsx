import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import Transition from "./Transition";

const GeneralLayout = ({children}) => {
  return (
    <div className='layout-container'>
      <NavBar />
      <div className="layout-inner">
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

export default GeneralLayout;