import React, { useState } from 'react'
import styles from "./GroupModal.module.css"
import { v4 as uuidv4 } from 'uuid';

const colors=["#B38BFA","#FF79F2","#43E6FC","#F19576","#0047FF","#6691FF"]

const GroupModal = ({groups,toggleModal,addGroup}) => {
    const [groupName,setGroupName]=useState('');
    const [selectedColor,setSelectedColor]=useState('');
    const getInitials=(name)=>{
      const words=name.trim().split(" ");
      if(words.length===1){
        return words[0][0].toUpperCase();
      }  
      return (words[0][0]+words[1][0]).toUpperCase();
    }
    const handleSubmit=(e)=>{
      if(groupName.trim().length===0){
        alert("Group Name field is required");
        return; 
      }
      if(groupName.trim().length<=1){
        alert("Group Name must be greater than 1");
        return;
      }
      if(selectedColor===''){
        alert("Color field is required");
        return;
      }
      const groupNameIsPresent=groups.filter((group)=>{
        return group.name===groupName.trim();
      })
      if(groupNameIsPresent.length){
        alert("This Group Name is taken");
        return;
      }
      const newGroup={
        id:uuidv4(),
        name:groupName.trim(),
        color:selectedColor,
        initials:getInitials(groupName),
        notes:[]
      }
      addGroup(newGroup);
      toggleModal(e)
    }
  return (
    <div className={styles['modal-container']} onClick={toggleModal}>
        <div className={`actual-modal ${styles['modal']}`}onClick={(e)=>e.stopPropagation()}> 
            <div className={styles['input-container']}>
              <h3>Create New group</h3>
              <div className={styles['group-name']}>
                <label>Group Name</label>
                <input type='text' placeholder='Enter group name' onChange={(e)=>setGroupName(e.target.value)} required/>
              </div>
              <div className={styles['color-container']}>
                <label>Choose colour</label>
                <span className={styles['color-options']}>
                  {
                  colors.map((color)=>{
                    return (<div className={styles['color']}
                    style={{backgroundColor:color,
                      borderWidth:selectedColor===color?'1.5px':'',borderStyle:selectedColor===color?'solid':'',
                      borderColor:selectedColor===color?'black':''}} onClick={(e)=>setSelectedColor(color)}></div>)
                  })
                }
                </span>
              </div>
            </div>
            <div className={styles['button-div']}>
              <button onClick={(e)=>handleSubmit(e)}>Create</button>
            </div>
        </div>
    </div>
  )
}

export default GroupModal