import DashboardLayout from "../../../components/common/DashboardLayout";

const Statements = function () {
  return (
    <div className="p-5">
      <div className="d-flex align-items-center mb-3">
        <h2>Problem Statements</h2>
      </div>

    </div>
  )
}

Statements.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);
export default Statements;