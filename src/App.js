import { useEffect, useState } from 'react';
import './App.css';
import Notes from './components/Notes';
import Sidebar from './components/Sidebar';

function App() {
  const [groups,setGroups]=useState(()=>{
    const savedGroups=localStorage.getItem('notes-group');
    return savedGroups?JSON.parse(savedGroups):[];
  })
  const [isMobile,setIsMobile]=useState(window.innerWidth <= 360)
  console.log("is MObile",isMobile);
  const [selectedGroup,setSelectedGroup]=useState(null);
  const addGroup=(group)=>{
    const updatedGroups=[...groups,group];
    setGroups(updatedGroups);
  }
  const addNote=(groupId,note)=>{
    const updatedGroups=groups.map((group)=>{
      if(group.id=== groupId){
        return {...group,notes:group.notes ? [...group.notes, note] : [note]};
      }
      return group;
    })
    setGroups(updatedGroups);
    console.log(selectedGroup);
  } 

  useEffect(()=>{ 
     localStorage.setItem('notes-group',JSON.stringify(groups));
  },[groups])
  return (
    <div className="App"> 
      <Sidebar
       groups={groups}
       addGroup={addGroup}
       selectedGroup={selectedGroup}
       setSelectedGroup={setSelectedGroup}
       isMobile={isMobile}
       setIsMobile={setIsMobile}
      />
      <Notes selectedGroup={selectedGroup} addNote={addNote} setSelectedGroup={setSelectedGroup} isMobile={isMobile} setIsMobile={setIsMobile} />
    </div>
  );
}

export default App;
