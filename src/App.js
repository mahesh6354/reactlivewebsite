import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Home } from './Component/Home';
import { AdminCate } from "./Admin/AdminCate";
import { Category } from "./Component/Category";
import { Post } from './Admin/Post';
import { Admin } from "./Admin/Admin";
import { AdminPost } from "./Admin/AdminPost";
import { Edit } from './Admin/Edit';
import { Policy } from "./Component/Policy";
import { Login } from "./Component/Login";
import { FirstCate } from "./Component/FirstCate";
import { CategoryPage } from "./Component/CategoryPage";
import { ErrorPage } from "./Component/ErrorPage";
import { SubcategoryPage } from "./Component/SubcategoryPage";
import { SearchPage } from "./Component/SearchPage";
import { ViewPost } from "./Admin/ViewPost";
import { AllPost } from './Component/AllPost';
import { TotalCardPost } from "./Component/TotalCardPost";
import { AdsComponent } from "./AdsComponent";
import { AdminPanel } from "./Admin/AdminPanel";

function App()  {
  return (
 
    <div className="App">
    <BrowserRouter>
    <Routes>
  
    <Route  path="/" exact element={<Home />} />
    <Route  path="/admin" element={<Admin />} />
    <Route  path="/AdminPanel" element={<AdminPanel />} />
    <Route  path="/admincate" element={<AdminCate />} />
    <Route  path="/viewpost" element = {<ViewPost />} />
    
    <Route  path="/edit/:id" element={<Edit />} />
    <Route   path="/category" element={<Category />} />

    <Route   path="/posted" element={<Post />} />
    <Route  path="/update/:id" element={<AdminPost />} />


    <Route  path="/post/:id" element= {<FirstCate />} />
    <Route  path="/latestblog/:id" element= {<FirstCate />} />
    <Route path="/Category/:id" element={<CategoryPage />} />
    <Route  path="/subcategoryPage/:id" element={<SubcategoryPage />} />
    <Route  path="/allpost" element={<AllPost /> } />
    <Route  path="/allpostcard" element={<TotalCardPost /> } />   
    <Route  path="/policy" element={ <Policy />} />
    <Route  path="/loginuser" element={ <Login />} />
    <Route  path="/search" element={<SearchPage />} />
    <Route  path="/errorPage" element={<ErrorPage />} />
    <Route element={<ErrorPage />} />
    <Route  path ='*' element = {<ErrorPage />} />
    <Route path='*' element= {<Navigate to="/" replace />} />
    
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;