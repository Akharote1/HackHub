import DashboardLayout from "../../../components/common/DashboardLayout";

const Screening = function () {
  return (
    <div className="p-5">
      <div className="d-flex align-items-center mb-3">
        <h2>Screening</h2>
      </div>

    </div>
  )
}

Screening.getLayout = (page) => (<DashboardLayout>{page}</DashboardLayout>);

export default Screening;