import React, { useState } from 'react'
import styles from "./Sidebar.module.css"
import { FaPlus } from 'react-icons/fa';

import GroupModal from './GroupModal'; 


const Sidebar = ({groups,addGroup,selectedGroup,setSelectedGroup,isMobile,setIsMobile}) => {
  const [isModalOpen,setIsModalOpen]=useState(false);
  const toggleModal=(e)=>{
    // console.log(e.currentTarget.classList.contains("actual-modal"))
    // console.log(e.target.classList)
    if(e.target.tagName==="INPUT"||e.target.className==="circle"){
      return;
    }
    setIsModalOpen(!isModalOpen); 
  } 
  return (
    <div className={styles['sidebar-container']} style={{display:isMobile&&selectedGroup?'none':''}}>
      <div className={styles['heading']}>
        <h2>Pocket Notes</h2>
      </div>
      
      <div className={styles['group-container']}>
        {
          groups.map((group)=>{
            return (
              <div onClick={()=>setSelectedGroup(group)} className={styles['group-name']} style={{backgroundColor:selectedGroup&&group.id===selectedGroup.id?'#e7e2e2':'',borderRadius:'10px'}} >
                 <div className={styles['initials']} style={{backgroundColor:group.color} }>
                  {
                    <div className={styles['font']}>{group.initials}</div>
                  } 
                  </div>
                  <div className={styles['name']}>
                    {
                    group.name
                  }
                  </div>
              </div>
            )
          })
        }
     
        <FaPlus onClick={toggleModal} className={styles['plus-icon']}/>
      </div>
      {
        (isModalOpen && <GroupModal groups={groups} toggleModal={toggleModal} addGroup={addGroup}/>)
      }
    </div>
  )
}

export default Sidebar