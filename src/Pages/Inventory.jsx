import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Plus, Search } from 'lucide-react'
import "./inven.css"



const Inventory = () => {
  return (
    <div className='main'>
      <div>
      <div style={{margin:"7px 56px",display:"flex",float:"right"}}>
        <div className='main-input'>
          <Search color='#d6e' />
          <input type="text" placeholder='Search...container No/current Location/Grade'  className= "main-searchbox" />
        </div>
        <div  className='add'>
          <Plus color='black'/>
          <h6>Add container</h6>
        </div>
      </div>
      </div>
      <div style={{marginTop:"10px",alignSelf:"center"}}>
        <table>
          <thead>
            <tr>
              <th>Container No</th>
              <th>Container Type</th>
              <th>Product Type</th>
              <th>Current Location</th>
              <th>Current Depot</th>
              <th>Principal</th>
              <th>Yorm</th>
              <th>Max.Gross.Weight</th>
              <th>Tare Weight</th>
              <th>Grade</th>
              <th>Note</th>
              <th>On Hire Date</th>
              <th>ON Hire Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
            </tr>
            <tr>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
              <td>1234</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Inventory