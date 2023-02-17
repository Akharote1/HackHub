import DashboardLayout from "../../../components/common/DashboardLayout";

const Communication = function () {
  return (
    <div className="p-5">
      <div className="d-flex align-items-center mb-3">
        <h2>Communication</h2>
      </div>

    </div>
  )
}

Communication.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);
export default Communication;