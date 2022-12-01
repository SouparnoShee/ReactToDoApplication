import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Todoicon from '../images/Todoicon.png'
import emo from '../images/emo.png'


// Function to store notes in local storage
const getLocalItems = () => {
  const list = JSON.parse(localStorage.getItem('lists'));

  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  } else {
    return [];
  }
}

function Todo() {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  // Adding the items
  const Additem = () => {
    if (!inputData) {
      alert("Please put some value")

    } else if(inputData && !toggleSubmit){
        setItems(
          items.map((elem) =>{
            if(elem.id=== isEditItem){
              return{...elem, name:inputData}
            }
            return elem;
          })
        )
        setToggleSubmit(true);
        setInputData('');
        setIsEditItem(null);
    }
     else {
      const allInputData = { id: new Date().getTime().toString(), name:inputData}
      setItems([...items, allInputData]);
      setInputData('');
    }


  }

  // deleting the items
  const deleteitem = (index) => {
    // console.log(id);
    const updateitems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateitems);
  }

  // get the id and name of data clicked to edit


  // Edit the items
  const editItem= (id)=>{
    const newEditItem = items.find((elem) =>{
      return elem.id === id
    })
    console.log(newEditItem)
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);


  }

  // Deleting every items
  const deleteAll = () => {
    setItems([]);
  }

  // adding data to localstorage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div>
        <img src={Todoicon} alt="nothing" className='todoimg' />
        <h2 className='Noting'>Write your todo list below</h2>
      </div>
      <div className="inputs">
        <input className='theinputs' type="text" placeholder='✍🏻 Add Your Note Here' id='' value={inputData} onChange={(e) => setInputData(e.target.value)}/>
        {
          toggleSubmit ? <i className="fa fa-duotone fa-file-circle-plus add-btn fa-2xl iconofinput" title='Add-Items' onClick={Additem}></i>: <i className="far fa-edit add-btn fa-2xl iconofinput" title='Update Item' onClick={Additem}></i>
        }
        
      </div>
      <div className="showItems">
        {
          items.map((elem) => {
            return (
              <div className="eachItems" key={elem.id}>
                <span>{elem.name}</span>
                <i className="far fa-edit add-btn" title='Edit Item' onClick={() => editItem(elem.id)}></i>
                <i className="far fa-trash-alt add-btn" title='Delete Item' onClick={() => deleteitem(elem.id)}></i>
              </div>
            )
          })
        }
      </div>

      <div className="showItems">
        <button className='btnrmv' onClick={deleteAll}>REMOVE ALL</button>
      </div>
      <div className="smily">
        <img className="smilyemo" src={emo} alt="not found" />
      </div>
    </>
  )
}

export default Todo
