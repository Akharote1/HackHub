import { Badge, Button, Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axiosClient from "../../services/axios-client";
import { useUser } from "../../hooks/AuthContext";
import Link from "next/link";

function ListingsTable() {
  const [listings, setListings] = useState(null);
  const {user} = useUser()

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const res = await axiosClient.get('/user/listings');
        setListings(res.data.listings)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [user])
  
  if (!listings) return null;

  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Listing Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {listing.name}
              </td>
              <td>
                <Badge>Upcoming</Badge>
              </td>
              <td>
                <Link href={'/myhackathon/' + listing.slug}>
                  <Button>
                    View Dashboard
                  </Button>
                </Link>

                <Link href={'/hackathon/' + listing.slug}>
                  <Button className="ms-4">
                    View Listing
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
          
        </tbody>
      </Table>
    </Card>
  )
}

export default ListingsTable;