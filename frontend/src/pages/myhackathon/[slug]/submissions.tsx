import DashboardLayout from "../../../components/common/DashboardLayout";

const Submissions = function () {
  return (
    <div className="p-5">
      <div className="d-flex align-items-center mb-3">
        <h2>Submissions</h2>
      </div>

    </div>
  )
}

Submissions.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);
export default Submissions;