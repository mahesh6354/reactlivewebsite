import React, { useEffect, useRef, useState } from 'react';
import '../index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import backendurl from '../Backend';

const Post = () => {
    
    const editor=useRef(null);

    const [filename, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDescription] = useState('');
    const [sat, setDrop] = useState('')
    const [dropdownData, setDropdownData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const [shortdesc, setShortDesc] = useState('');
    const [author, setAuthor] = useState(''); 
    const navigator = useNavigate();

   


    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [showMetaFields, setShowMetaFields] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState(false);

   
    console.log("checkbox values is the",checkboxValue)
   
    const handleMetaTitleChange = (e) => {
      setMetaTitle(e.target.value);
    };
    console.log("meta title is the ",metaTitle)
  
    const handleMetaDescriptionChange = (e) => {
      setMetaDescription(e.target.value);
    };

    console.log("meta desc is the ",metaDescription)
    
    const handleShowMetaFields = (e) => {
      setShowMetaFields(e.target.checked);
    };

    const handleInput = (e) => {
      setTitle(e.target.value)
    }
  

    const setImgFile = (e) => {
      setFile(e.target.files[0])
    }

    const handleSelect = (eventKey) => {
      setSelectedValue(eventKey);
    };
    

    const handleDrop = (e) => {
      console.log("event",e)
      setDrop(e)
    }
   

    const handleShortDesc = (e) => {
      console.log(e.target.value);
      setShortDesc(e.target.value);
    }

    
    const handleAuthor = (e) => {
      console.log("author name is the",e.target.value)
      setAuthor(e.target.value);
    }
  
    const handleClick = async (e) => {
  e.preventDefault();

  try {
    var formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("photo", filename);
    formData.append("shortdesc", shortdesc);
    formData.append("desc", desc);
    formData.append("category", selectedValue);
    formData.append("sat", sat);
    formData.append("checkbox", checkboxValue);

    // Add Meta Title and Meta Short Description to formData
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(backendurl + "/posted", formData, config);
    console.log(res);
    navigator("/admincate");
  } catch (err) {
    console.log("err is the", err);
  }
};


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get( backendurl + "/dropfill");
          setDropdownData(response.data);
          console.log(response.data)
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div>
    <form>
      <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>ADD NEW POST</h1>
        </div>
      </div>
        <div class="form-group margin">
          <label>Title</label>
          <input type="text" name='title'  onChange={handleInput} class="form-control"  placeholder="Enter Title" required/>
          
        </div>
        <div class="form-group">
        <label>Author Name :</label>
        <input type="name" name='author'  onChange={handleAuthor} class="form-control"  placeholder="Enter Author Name" required/>
        
      </div>

      <br />
       {/* New checkbox for showing Meta Title and Meta Description */}
 <div className="form-check" style={{ marginTop: '20px', marginBottom: '20px' }}>
 <input
   className="form-check-input"
   type="checkbox"
   id="showMetaFields"
   checked={showMetaFields}
   onChange={handleShowMetaFields}
 />
 <label className="form-check-label" htmlFor="showMetaFields">
   Show Meta Title and Meta ShortDescription
 </label>
</div>

{/* Conditionally show Meta Title and Meta Description input fields */}
{showMetaFields && (
 <div>
   <div className="form-group">
     <label>Meta Title</label>
     <input
       type="text"
       name="metaTitle"
       value={metaTitle}
       onChange={handleMetaTitleChange}
       className="form-control"
       placeholder="Enter Meta Title"
     />
   </div>

   <div className="form-group">
     <label>Meta ShortDescription</label>
     <textarea
       rows="4"
       name="metaDescription"
       value={metaDescription}
       onChange={handleMetaDescriptionChange}
       className="form-control"
       placeholder="Enter Meta Description"
     ></textarea>
   </div>
 </div>
)}
      <br />
        <div class="form-group m1">
        <input type="file" onChange={setImgFile} required/>
        </div>
        <div>
        <p>Enter the Short Description :</p>
       
      <textarea style={{width : "100%"}}  rows="10" cols="150" name="message" onChange={handleShortDesc} placeholder="Enter your message"></textarea>
  
        </div>
        <br />
       <div>
       Long Desc :
       <JoditEditor
			ref={editor}
      value={desc}
      onChange={newContent=>setDescription(newContent)}
		/>
       
       </div>
  <br />
  <div className="form-group m1">
      <DropdownButton
        alignRight
        title="Select Any One"
        id="dropdown-menu-align-right"
        onSelect={handleSelect}
      >
        {dropdownData.map((item) => (
          <Dropdown.Item key={item.id} eventKey={item.title}>{item.title}</Dropdown.Item>
        ))}
      </DropdownButton>
      <p>Selected Value: {selectedValue}</p>
    </div>
  <br />
      <div className="form-group m1" style={{backgroundColor : "black"}}>
      <DropdownButton className='btn-link'
      alignRight
      title="Select Any One"
      id="dropdown-menu-align-right"
      onSelect={handleDrop}>
              <Dropdown.Item eventKey="publish">Publish</Dropdown.Item>
              <Dropdown.Item eventKey="unpublish">Unpublish</Dropdown.Item>
              <Dropdown.Item eventKey="draft">Draft</Dropdown.Item>
             
              
      </DropdownButton>
        </div>
        <br />
        
        <div className="form-check" style={{    marginTop: '20px',marginBottom: '20px'}}>
  <input 
    className="form-check-input" 
    type="checkbox"
    id="exampleCheck"
    checked={checkboxValue}
    onChange={(e) => setCheckboxValue(e.target.checked)}
  />
  <label className="form-check-label" htmlFor="exampleCheck">
    if you are checked then this post is view to the Ui Side
  </label>
</div>



        <button type="submit" onClick={handleClick} class="btn btn-primary">Submit</button>

        </div>
        </form>
     </div>
  )
}

export { Post };
