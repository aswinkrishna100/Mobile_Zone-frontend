import React from 'react'

function Orders() {
  return (
    <div>
      <h3 className='mb-5 mt-5 text-center'>Orders</h3>
      <table className='m-5 w-75 shadow table table-bordered'>
        <thead className='text-center'>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Product</th>
                <th>Price</th>
            </tr>
        </thead>
      </table>
    </div>
  )
}

export default Orders
