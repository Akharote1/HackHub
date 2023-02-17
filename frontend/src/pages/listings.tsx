import ListingsTable from "../components/dashboard/ListingsTable";

const Listings = function () {
  return (
    <div className="p-5">
      <div className="d-flex align-items-center mb-3">
        <h2>My Listings</h2>
      </div>

      <ListingsTable />
    </div>
  )
}

export default Listings;