
import "./form.css";
import { Form } from "react-router-dom";



   get_url:"https://hastin-container.com/staging/api/container-group/get"
   all_url:"https://hastin-container.com/staging/api/port/all"   /*GET*/
   all_next:"https://hastin-container.com/staging/api/depot/fetch/1e26f57e-f056-4643-a563-64b9e754efe8" /*Get*/


   
const ContainerForm = () => {
  return (
    <Form onSubmit={handleSubmit} className="frm">
      <div>
        <label htmlFor="containerno">Container No</label>
        <input type="text" name="containerno" />
        <label htmlFor="product-type">Product Type</label>
        <input type="text" name="product-type" />
        <label htmlFor="current-Depot">Current Depot</label>
        <input type="text" name="current-Depot" />
        <label htmlFor="yom">YOM</label>
        <input type="date" name="yom"/>
        <label htmlFor="max-gross-weight">Max-Gross-weight</label>
        <input type="text" />
        <label htmlFor="grade">Grade</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="containertype">Container Type</label>
        <select name="containertype" id="containertype">
          <option value="Owned">owned</option>
          <option value="Leased">Leased</option>
          <option value="Agency Unit">Agency Unit</option>
        </select>
        <label htmlFor="currentLocation">Current Location</label>
        <input type="text" />
        <label htmlFor="principal">principal</label>
        <input type="text" />
        <label htmlFor="Tareweight">Tare Weight</label>
        <input type="text" />
        <label htmlFor="choosestatus">ChooseStatus</label>
        <input type="text" />
        <label htmlFor="notes">Notes</label>
        <input type="text" />
        <div>
          <button>Submit</button>
        </div>
      </div>
    </Form>
  )
}
export default ContainerForm;
