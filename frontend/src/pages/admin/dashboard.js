import { useContext } from "react";
import { AdminContext } from "../../admin/context/AdminContext";

const AdminDashboard = () => {
  const { admin } = useContext(AdminContext);


  
  if (!admin.isLoggedIn) {
    return <h1 className="text-center">No authorized</h1>;
  }


  return (
    <>
      <div className="container">
        <h1 className="mb-3">Products</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Stock</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry the Bird</td>
              <td>###</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
