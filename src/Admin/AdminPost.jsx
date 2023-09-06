import React, { useEffect, useRef, useState } from 'react';
import '../index.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import './main.css'
import backendurl from '../Backend';

const AdminPost = () => {
  const editor = useRef(null);
  const [author, setAuthor] = useState('');
  const [filename, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDescription] = useState('');
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [sat, setDrop] = useState('');
  const [shortdesc, setShortDesc] = useState('');
  const [category, setCategory] = useState('');
  const navigator = useNavigate();
  const { id } = useParams();
  const [checkboxValue, setCheckboxValue] = useState(false);

  const [metatitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // console.log("metadesc",metaDescription)
  // console.log("metatitle",metatitle)
  const [selectedCategoryId, setSelectedCategoryId] = useState('');


  
  
  // console.log("checkbox is the ", checkboxValue);

  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleShortDesc = (e) => {
    setShortDesc(e.target.value);
  };

  const fileUploadedURl =  backendurl + '/uploads/';

  // console.log("hii", fileUploadedURl);


  const handleImage = (e) => {
    const file = e.target.files[0];
    setFile(file ? fileUploadedURl + file : '');
  };

  const handleDrop = (e) => {
    // console.log("event", e);
    setDrop(e);
  };

  const [dynamic, setDynamic] = useState('');
  // console.log("dynamic img is the", dynamic);

  const handleDynamic = (e) => {
    setDynamic(e.target.files[0]);
  };

  const handleSelect = (eventKey) => {
    // Find the selected category object from dropdownData array based on the eventKey (category title)
    const selectedCategory = dropdownData.find((item) => item.title === eventKey);
    if (selectedCategory) {
      // Set the selected category ID and category name in the state
      setSelectedValue(selectedCategory.title);
      setSelectedCategoryId(selectedCategory.id);
      setCategory(selectedCategory.title);
    }
  };
  
  
  
  // console.log("selected is the", category);
  // console.log("category_id",selectedCategoryId)

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };
  // console.log("author name is the", author);

  const handleCheckboxChange = (event) => {
    setCheckboxValue(event.target.checked);
  };

  const handleMetaTitleChange = (e) => {
    setMetaTitle(e.target.value);
  };
  
  const handleMetaDescriptionChange = (e) => {
    setMetaDescription(e.target.value);
  };
  
  

  const handleClick = async (e) => {
    e.preventDefault();
    try {

      var formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("photo", dynamic);
      formData.append("shortdesc", shortdesc);
      formData.append("desc", desc);
      
      formData.append("category", selectedValue);
      formData.append("sat", sat);
      formData.append("checkbox", checkboxValue);
      formData.append("metatitle", metatitle);
      formData.append("metaDescription", metaDescription);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      const res = await axios.put( backendurl + "/update/" + id, formData, config);
      // console.log(res);
      // console.log("hii");
      navigator("/viewpost");
    } catch (err) {
      // console.log("err is the", err);
    }
  };

  useEffect(() => {
    axios.get( backendurl + '/update/' + id)
      .then(res => {
        // console.log(res.data[0].id);
        // console.log(res.data[0]);
        setTitle(res.data[0].title);
        setAuthor(res.data[0].author);
        setFile(res.data[0].image);
        setShortDesc(res.data[0].shortdesc);
        setDescription(res.data[0].desc);
        setCategory(res.data[0].category);
        setDrop(res.data[0].sat);
        
         // Set meta title and meta description if they exist in the response data
      if (res.data[0].metatitle) {
        setMetaTitle(res.data[0].metatitle);
      }
      if (res.data[0].metaDescription) {
        setMetaDescription(res.data[0].metaDescription);
      }

      // Set default values if meta title and meta description are not present
      if (!res.data[0].metatitle) {
        setMetaTitle(''); // Set a default value or leave it empty
      }
      if (!res.data[0].metaDescription) {
        setMetaDescription(''); // Set a default value or leave it empty
      }

        if (!selectedValue) {
          setSelectedValue(res.data[0].category);
        }
        if (checkboxValue === '') {
          setCheckboxValue(res.data[0].checkboxValue);
        }
      })
      .catch(err => console.log(err));
  
    const fetchData = async () => {
      try {
        const response = await axios.get(backendurl + "/dropfill");
        setDropdownData(response.data);
        // console.log(response.data);
      } catch (error) {
        // console.log(error);
      }
    };
  
    fetchData();
  }, [id]);
  

  return (
    <div>
      <form>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1>UPDATE POST</h1>
            </div>
          </div>
          <div className="form-group margin">
            <label>Update Title :</label>
            <input type="text" value={title} onChange={handleInput} className="form-control" placeholder="Enter title" required />
          </div>
          <br />
          <div className="form-group">
          <label>Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={metatitle}
            onChange={handleMetaTitleChange} // Use the onChange handler
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
          onChange={handleMetaDescriptionChange} // Use the onChange handler
          className="form-control"
          placeholder="Enter Meta Description"
        >
        </textarea>
        </div>
          <br />
          <div className="form-group">
            <label>Author Name is the : </label>
            <input type="name" value={author} onChange={handleAuthor} className="form-control" placeholder="Enter Author Name is the" required />
          </div>
          <br />
          <div className="form-group m1 img">

            Selected Img is :
            <br />
            <br />
            {filename && <img src={fileUploadedURl + filename} className='img' alt='filename' />}

            {/* Display the file name only when a file is selected */}


            <br />
            <br />
            Select New Img : 👍
            <br />
            <br />
            <input className='img'
              type="file"
              onChange={handleDynamic}
              name="filename"
              required
            />
            <br />
            {dynamic && <p><img src={dynamic} alt="Selected Image" /></p>}

          </div>
          <br />
          <div>
            <p>Enter the Short Description :</p>

            <textarea className='img' value={shortdesc} onChange={handleShortDesc} rows="10" cols="150" name="message" placeholder="Enter your message"></textarea>

          </div>
          <br />
          <JoditEditor
            ref={editor}
            value={desc}
            onChange={newContent => setDescription(newContent)}
            name="editor"
          />
          <br />
          <div className="form-group m1">
            <DropdownButton
              alignRight
              title={category}
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
          <div className="form-group m1">
            <DropdownButton
              alignRight
              title={sat}
              id="dropdown-menu-align-right"
              onSelect={handleDrop}
            >
              <Dropdown.Item eventKey="publish">Publish</Dropdown.Item>
              <Dropdown.Item eventKey="unpublish">Unpublish</Dropdown.Item>
              <Dropdown.Item eventKey="draft">Draft</Dropdown.Item>
            </DropdownButton>
          </div>
          <br />
          <div>
          <p>values is the " {checkboxValue ? "Unchecked" : "checked"} " </p>
          <label>
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={checkboxValue}
          />
          if you are checked then this post is view to the Ui Side
        </label>
        
            <p>Checkbox value: {checkboxValue ? 'Checked' : 'Unchecked'}</p>
          </div>
          <button type="submit" style={{    marginBottom: '35px'}} onClick={handleClick} className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export { AdminPost };
