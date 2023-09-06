import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from './Header';
import { Link , useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import play from "../img/Play-Quizzes (3).jpg"
import moment from 'moment';

import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import backendurl from '../Backend';

const Home = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState([]);
  const [deal, setDeal] = useState([]);
  const [card, setCard] = useState([]);
  const [cateMi, setCateMi] = useState([]);
  const [xiaomi, setXiaomi] = useState([]);
  const [lenovo, setLenovo] = useState([])
  const [samsung, setSam] = useState([]);
  const [related, setRelated] = useState([]);

  const navigate = useNavigate();

  const fetchAllBooks = async () => {
  try {
    const res = await axios.get(backendurl + '/getactivecategory');
    setCategory(res.data);
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};


  const fetchAllPostData = async () => {
    try {
      const res = await axios.get(backendurl + '/postedUser');
      setData(res.data.data);
      console.log(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTitle = async() => {
    try{
       const res = await axios.get(backendurl + '/title');
        setTitle(res.data.data);
     }catch(err) {
      console.log(err)
    }
}
  console.log('tit is the ',title)

  const fetchDeals = async () => {
    try{
      const res = await axios.get(backendurl + '/deals');
      console.log("data is the deal",res.data)
      setDeal(res.data.data)
    }catch(err) {
      console.log(err)
    }
  }
 console.log('deals is the',deal)

 const fetchCard = async () => {
  try{
   const res = await axios.get(backendurl + '/card');
   console.log(res)
   setCard(res.data.data);
 
  }catch(err) {
    console.log(err)
  }
 }
 console.log("card details is the ",card)

const fetchMI = async() => {
  try{
    const res = await axios.get(backendurl + '/mi');
    console.log(res)
    setCateMi(res.data.data);

  }catch(Err){
    console.log(Err)
  }
}
console.log("MI is the",cateMi)

const fetchXiaomi = async() => {
 try{
   const res = await axios.get(backendurl + '/xiaomi')
   setXiaomi(res.data.data)
 }catch(err) {
  console.log(err)
 }

}

 const fetchLenovo = async() => {
  try{
   const res = await axios.get(backendurl + '/lenovo')
   setLenovo(res.data.data);

  }catch(err) {
    console.log(err)
  }
 }
 console.log("lenovo data is the",lenovo)


 const fetchSam = async() => {
  try{
    const res = await axios.get(backendurl + '/samsung')
    setSam(res.data.data)
  }catch(err){
    console.log(err)
  }
 }

 const fetchRelatedData = async () => {
  try {
    const res = await axios.get(backendurl + '/relatedpost');
    setRelated(res.data.data); 
  } catch (err) {
    console.log(err);
  }
};

console.log('related data:', related);



  useEffect(() => {
    fetchAllBooks();
    fetchAllPostData();
    fetchTitle();
    fetchDeals();
    fetchCard();
    fetchMI();
    fetchXiaomi();
    fetchLenovo();
    fetchSam();
    fetchRelatedData();
  }, []);

  const handleShowFullBlog = async (blogId) => {
    // // Open the new tab only if the window was successfully opened
    // const newTab = window.open('https://codigo.co.in/', '_blank');
    // if (newTab) {
    //     // Wait for a specific duration (e.g., 10 seconds) before proceeding
    //     await new Promise(resolve => setTimeout(resolve, 6000));

    //     // Close the new tab/window
    //     newTab.close();
    // }

    // // // Continue with the rest of your code
    const postid = blogId;
    console.log("post id is the", postid);
    navigate(`/post/${postid}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


  

//the latest news

  const handleUrl = () => {
    //link add krva mate 
    // window.location.href = 'https://948.win.qureka.com';
    // window.location.href = 'https://948.win.qureka.com';
  }
  

  return (
    <>
 
    <Header className="my-5 sticky-top" categories={category} /> 
  
    <section>
  <div className="_2e65b25b">
    <div className="col-lg-12 col-md-12 col-sm-12 mt-3 ">
      <p className="ii text-center mt-4 font-weight-bold">
        We independently review everything we recommend. When you buy through our links, we may earn a commission.
        <Link to="/policy" style={{ color: 'red' }}>Learn More</Link>
      </p>
    </div>
  </div>

  <div className="_2e65b25b mt-3">
    <div className="row">
      <div className="col-lg-2 col-md-2 col-sm-12 order-2 order-sm-2 order-md-3 order-lg-3">
      <div className='tit hover badge-ribbon' onClick={() => handleUrl()}>
      <div>
        <p className='tit gfg  hover sxs' onClick={() => handleUrl()}>Dare to Question,<br /> Dare to Know</p>
      </div>
    </div>
        <h3 className='mt-4 title_12 p'>The latest</h3>
        <div className='sd'>
          {title.map((el) => (
            <div className='gf' key={el.id}>
              <div>
                <p className='tit hover' onClick={() => handleShowFullBlog(el.id)}>{el.title}</p>
                <p className='st'>Yesterday</p>
              </div>
            </div>
          ))}
        </div>
        <div className='allpost'>
          <Link className=' a' to="/allpost">See Everything... </Link>
        </div>
      </div>
      <div className="col-lg-8 col-md-8 col-sm-12 order-1 order-sm-1  order-md-3 order-lg-3 ">
        {data.length > 0 ? (
          data.map((el, i) => (
            <div key={el.id}>
              {console.log('----- item -----', el)}
              <div className="img">
                <img className='img1 bhg img' onClick={() => handleShowFullBlog(el.id)}
                  src={backendurl + `/uploads/${el.image}`}
                  alt="mahesh"/>
              </div>
              <h1 className='title margin-top hover qa wqwq' onClick={() => handleShowFullBlog(el.id)}>{el.title}</h1>
              <h1 className='authorfs'>by {el.author}</h1>
              <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                <div className='shortdesc'>
                <p className='shortdesc1 ' onClick={() => handleShowFullBlog(el.id)}>{el.shortdesc}</p>
              </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
              <h3 className='headingfs_1'>Related</h3>
              <div className='olai'>
              <div className='fotowq'>
                {related.map((el) => (
                  <div className='klaa mt-2' key={el.id} onClick={() => handleShowFullBlog(el.id)}>
                    {el.title}
                  </div>
                ))}
              </div>
              </div>
              </div>
              </div>
              </div> 
            </div>
          ))
        ) : (
          <div></div>
        )} 
      </div>
      <div className="col-lg-2 col-md-2 col-sm-12 order-3 order-sm-3 order-md-3 order-lg-3 fe" style={{ lineHeight: '35px' }}>
        <h3 className='title_12 p'>Daily Deals </h3>
        <div className='shadow1 hover'>
          <img className='w-h' src={play} alt="" onClick={() => handleUrl()} />
          <p  className='tit hover' onClick={() => handleUrl()}>Play Quizzies and earn money</p>
        </div>
        <div className='as'>
          {deal.map((el) => (
            <div className='shadow1' key={el.id}>
              <img className='w-h ' src={backendurl + `/uploads/${el.image}`} alt="mahesh" onClick={() => handleShowFullBlog(el.id)} />
              <h1 className='tit0'>  
              <p className=' hover  tit2' onClick={() => handleShowFullBlog(el.id)}>{el.title}
              </p>
              </h1>
            </div>
          ))}
        </div>
        <div className='allpost'>
          <Link className='a' to="/allpostcard">See All Deals... </Link>
        </div>
      </div>
    </div>
  </div>
  <div className="_2e65b25b">
  <h3 className='color headingfs eew'>All Post</h3>
  <p className='our'>Our expert-approved style picks will keep you comfortable all summer long.</p>
  <div className="row">
    {card.length > 0 ? (
      card.map((el, i) => (
        <div className="col-lg-3 col-md-3 col-lg-3 jully marbot" key={el.id}>
          <div className="imgDiv  shadow1">
            <img
              className="card-img-top _d12"
              src={backendurl + `/uploads/${el.image}`}
              alt={el.title}
              style={{ width: '269px', height: '208px' }}
              onClick={() => handleShowFullBlog(el.id)}
            />
          </div>
          <div className="card-body">
            <p className="card-title1 text ds hover qq ed_1 catemargin1" onClick={() => handleShowFullBlog(el.id)}>{el.title}
            </p>
          </div>
        </div>
      ))
    ) : null}
  </div>
</div>
  <div className=" _2e65b25b margin-top1">
    <h3 className='._94ee19ce headingfs eew'>MI</h3>
    <div className='row top'>
      {cateMi.length > 0 && (
        <div className="col-lg-6 col-md-6 col-sm-12" key={cateMi[0]?.id}>
          <div className="image-wrapper shadow1">
            <img className="cateMi my-image img" src={backendurl + `/uploads/${cateMi[0].image}`} alt="mahesh" onClick={() => handleShowFullBlog(cateMi[0].id)} />
          </div>
          <div className="card-body">
            <div className="sat">
              <p className='cateMishort text1 hover cursor-pointer' onClick={() => handleShowFullBlog(cateMi[0].id)}>{cateMi[0].title}</p>
              <h1 className='cateMishort date khk'>UPDATED {moment(cateMi[0].date?.toString()).format('DD-MM-YYYY')}
              </h1>
              <h1 className='authorfs'> by {cateMi[0].author}</h1>
              <p className='cateMishort '>{cateMi[0].shortdesc}</p>
            </div>
          </div>
        </div>
      )}
      <div className="small col-lg-6 col-md-6 col-sm-12">
        <div>
          {cateMi.slice(1).map((el) => (
            <ul className='_304a7536' key={el.id}>
              <li className='_5a0546da shadow1'>
                <img className=' _2de903d9 _282e2639 img'
                 src={backendurl + `/uploads/${el.image}`}
                  alt="" onClick={() => handleShowFullBlog(el.id)} />
                <div className='_4d6eda15'>
                <h8 className="cateMishort  hover cursor-pointer"> 
                <p className=' f-s hover ds' onClick={() => handleShowFullBlog(el.id)}>{el.title}</p></h8>

                  <div className='ff7e0523'>
                  <h1 className='cateMishort date khk'>UPDATED {moment(cateMi[0].date?.toString()).format('DD-MM-YYYY')}
                  </h1>
                  </div>
                  <p className='tgt cateMishort '>{el.shortdesc}</p>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  </div>

  <br />
  <div className="_2e65b25b">
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <h1 className='color  headingfs eew '>Xiaomi</h1>
      </div>
    </div>
    <div className="row">
      {xiaomi.length > 0 ? (
        xiaomi.map((el, i) => (
          <div className="col-lg-4 col-md-4 col-sm-12  marbot" key={el.id}>
            <div className="shadow1 jully">
              <img
                className="card-img-top toto"
                src={backendurl + `/uploads/${el.image}`}
                alt={el.title}
                style={{ width: '408px', height: '292px' }}
                onClick={() => handleShowFullBlog(el.id)}
              />
              <div className="card-body">
                <h5 className="card-title  text dsa catemargin hover cursor-pointer" onClick={() => handleShowFullBlog(el.id)}>{el.title}</h5>
              
              <div className='ff7e0523'>
                  <h1 className='cateMishort date khk'>UPDATED {moment(el.date?.toString()).format('DD-MM-YYYY')}
                  </h1>
                  <p className="authorfs toto1">by {el.author}</p>
                  </div>
                  </div>
                  <p className='cateMishort toto2'>{el.shortdesc}</p>
            </div>
          </div>
        ))
      ) : null}
    </div>
  </div>

 
  <div className="_2e65b25b margin-top1">
  <h1 className='headingfs eew'>SAMSUNG</h1>
  <div className='row top'>
    {samsung.length > 0 && (
      <div className="col-lg-6 col-md-6 col-sm-12" key={samsung[0]?.id}>
        <div className="image-wrapper shadow1">
          <img className="cateMi my-image img" src={backendurl + `/uploads/${samsung[0].image}`} alt="mahesh" onClick={() => handleShowFullBlog(samsung[0].id)} />
        </div>
        <div className="card-body">
          <div className="sat">
            <p className='cateMishort text1 hover cursor-pointer' onClick={() => handleShowFullBlog(samsung[0].id)}>{samsung[0].title}</p>
            <h1 className='cateMishort date khk'>UPDATED {moment(samsung[0].date?.toString()).format('DD-MM-YYYY')}</h1>
            
            <p className='cateMishort '>{samsung[0].shortdesc}</p>
          </div>
        </div>
      </div>
    )}

    <div className="small col-lg-6 col-md-6 col-sm-12">
        <div className="ili">
          {samsung.slice(1).map((el) => (
            <ul className='_304a7536' key={el.id}>
              <li className='_5a0546da shadow1'>
                <img className='_2de903d9 _282e2639 img' src={backendurl + `/uploads/${el.image}`} alt="" onClick={() => handleShowFullBlog(el.id)} />
                <div className='_4d6eda15'>
                <h8 className="cateMishort  hover cursor-pointer"> 
                <p className=' f-s hover ds' onClick={() => handleShowFullBlog(el.id)}>{el.title}</p></h8>

                  <div className='ff7e0523'>
                  <h1 className='cateMishort date khk'>UPDATED {moment(samsung[0].date?.toString()).format('DD-MM-YYYY')}
                  </h1>
                  </div>
                  <p className='tgt cateMishort '>{el.shortdesc}</p>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
  </div>
</div>
</section>

  
      
  
      <Footer />
    </>
  );
};

export { Home };
