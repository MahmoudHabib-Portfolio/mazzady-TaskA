"use client"
import { MenuItem } from '@mui/material';
import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import {Box} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from "@mui/material/TableHead";
import { useState } from 'react';

/*------ MainCat Select Field -------*/
const MainCategory = styled(TextField)({
    '& label':{
      color: '#000',
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      lineHeight: '1'
    },
    '& label.Mui-focused': {
      color: '#333',
      fontWeight:'bold',
      fontSize: '16px',
      lineHeight: '1.5'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#e5e7eb',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #000'
      },
      '&:hover fieldset': {
        borderColor: '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000',
        borderWidth: '2px'
      },
      '& .MuiSelect-icon':{
        color: '#315241',
      }
    },
  });

  /*------ SubCat Select Field -------*/
const SubCategory = styled(TextField)({
    '& label':{
      color: '#000',
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      fontSize: '14px',
      lineHeight: '1'
    },
    '& label.Mui-focused': {
      color: '#333',
      fontWeight:'bold',
      fontSize: '16px',
      lineHeight: '1.5'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#e5e7eb',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #000'
      },
      '&:hover fieldset': {
        borderColor: '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000',
        borderWidth: '2px'
      },
      '& .MuiSelect-icon':{
        color: '#315241',
      }
    },
  });

  /*------ CategoryProp Select Field -------*/
const CategoryProp = styled(TextField)({
  '& label':{
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    lineHeight: '1'
  },
  '& label.Mui-focused': {
    color: '#333',
    fontWeight:'bold',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#e5e7eb',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #000'
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',
      borderWidth: '2px'
    },
    '& .MuiSelect-icon':{
      color: '#315241',
    }
  },
});

/*------ ProcessType Select Field -------*/
const UserInput = styled(TextField)({
  '& label':{
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    lineHeight: '1'
  },
  '& label.Mui-focused': {
    color: '#333',
    fontWeight:'bold',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#e5e7eb',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #000'
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',
      borderWidth: '2px'
    },
    '& .MuiSelect-icon':{
      color: '#315241',
    }
  },
});

function CategoryLists({Cats}) {

  const [mainCat, setMainCat] = useState("");
  const [subCat, setSubCat] = useState("");
  const [vCat, setVcat] = useState([]);
  const [vProcess, setVProcess] = useState({});
  const [ChildProp, setChildProp] = useState({});
  const [RenderTable, setRenderTable] = useState(false);

  const onAdd = (e) => {
    e.preventDefault();

    setRenderTable(true);
  }
  /* Rendering Sub-Categories */
  const RenderSubCat = (id) => {
    const item = Cats.find((i) => i.id === id);
    setVcat([item]);
  }
  /* Rendering Category Props */
  const RenderProcess = async (id) => {
    
   const res =  await fetch(`https://staging.mazaady.com/api/v1/properties?cat=${id}`,{
    method:"GET",
    headers: {
      "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16"
    }
   });

   const getProcess = await res.json();
  
   return setVProcess(getProcess);
  }

  /* Rendering CategoryOptions */
  const RenderCategoryOption = async (id) => {
    const res = await fetch(`https://staging.mazaady.com/api/v1/get-options-child/${id}`,{
      method:"GET",
      headers: {
        "private-key": "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16"
      }
     });

     const getCatChild = await res.json();
     return setChildProp(getCatChild);
  }

   /* const [fromuser, setFromuser] = useState(""); */
   const [inputValues, setInputValues] = useState(new Array(vProcess.data?.length).fill(''));
   const handleChange = (index, value) => {
     const newInputValues = [...inputValues];
       newInputValues[index] = value;
       return setInputValues(newInputValues);
   };

  return (
    <>
        <div className="w-full p-6">
        {/* Searchable Form */}
      <form onSubmit={onAdd}>
      <div className='grid gap-y-3'>  
        {/* Main Category Field */}
      <div className="grid grid-rows-1">
        <div>
          
          <MainCategory
                  fullWidth 
                  inputProps={{
                    sx: {
                      color: '#333',
                      fontSize: '14px',
                      fontFamily: 'sans-serif',
                      fontWeight: 'bold',
                      backgroundColor: '#fff',
                      padding:'10px 16px',
                    },
                    }}
                    defaultValue={mainCat}
                    onChange={(e) => setMainCat(e.target.value)}
                    label="Main Category" id="select" select>

                    {Cats?.map((cat) => (
                    <MenuItem 
                    key={cat.id} 
                    value={cat.name}
                    sx={{'&:hover': 
                    {color: '#fff',
                    backgroundColor:'rgba(49, 82, 65, 0.8)',
                    '&.Mui-selected': {
                      color:'#fff',
                      backgroundColor:'rgba(49, 82, 65, 1)',
                    }
                    },
                    '&.Mui-selected': {
                      color:'#fff',
                      backgroundColor:'rgba(49, 82, 65, 1)',
                    }}} 
                    onClick={() => RenderSubCat(cat.id)}
                    >
                    
                   {cat.name}
                 
                </MenuItem>
                    ))}
                      
                    </MainCategory>
        </div>
        </div>
        {/* Main Category Field */}

        {/* Sub Category Field */}
      <div className="grid grid-rows-1">
        <div>
          <SubCategory
                  fullWidth 
                  inputProps={{
                    sx: {
                      color: '#333',
                      fontSize: '14px',
                      fontFamily: 'sans-serif',
                      fontWeight: 'bold',
                      backgroundColor: '#fff',
                      padding:'10px 16px',
                    },
                    }}
                    defaultValue={subCat}
                    onChange={(e) => setSubCat(e.target.value)}
                    label="Sub Category" id="select" select>
                    {vCat?.map((Scat) => (Scat?.children.map((child) => (
                      <MenuItem 
                      key={child.id} 
                      value={child.name}
                      sx={{'&:hover': 
                      {color: '#fff',
                      backgroundColor:'rgba(49, 82, 65, 0.8)',
                      '&.Mui-selected': {
                        color:'#fff',
                        backgroundColor:'rgba(49, 82, 65, 1)',
                      }
                      },
                      '&.Mui-selected': {
                        color:'#fff',
                        backgroundColor:'rgba(49, 82, 65, 1)',
                      }}}
                      onClick={() => RenderProcess(child.id)} 
                      >
                    {child.name}
                  </MenuItem>
                    ))))}
                    </SubCategory>
        </div>
        </div>
        {/* Sub Category Field */}
        
        {/* Generating the category props dropdown menu */}
        {inputValues?.map((value, index) => (
          <Box 
          component="div"
          sx={{'& .MuiTextField-root': { mb: 2, width: '100%' }}} 
          noValidate
          autoComplete="off"
          key={index}
          className="grid grid-rows-1" 
          >
            {vProcess.data?.map((x) => (
              <>
              <CategoryProp
              fullWidth 
              inputProps={{
                sx: {
                  color: '#333',
                  fontSize: '14px',
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  backgroundColor: '#fff',
                  padding:'10px 16px',
                },
                }}
                key={index}
                defaultValue={value}
                onChange={(e) => handleChange(index, e.target.value)}
                label={x.name} id="select" select>
                  
                  {x.options?.map((pt) => (
                    <MenuItem 
                    key={pt.id} 
                    value={pt.name}
                    sx={{'&:hover': 
                    {color: '#fff',
                    backgroundColor:'rgba(49, 82, 65, 0.8)',
                    '&.Mui-selected': {
                      color:'#fff',
                      backgroundColor:'rgba(49, 82, 65, 1)',
                    }
                    },
                    '&.Mui-selected': {
                      color:'#fff',
                      backgroundColor:'rgba(49, 82, 65, 1)',
                    }}}
                    onClick={() => RenderCategoryOption(pt.id)}
                    >
                  {pt.name}
                </MenuItem>
                  ))}
                  
                <MenuItem
                value={"Other"}
                sx={{'&:hover': 
                {color: '#fff',
                backgroundColor:'rgba(49, 82, 65, 0.8)',
                '&.Mui-selected': {
                  color:'#fff',
                  backgroundColor:'rgba(49, 82, 65, 1)',
                }
                },
                '&.Mui-selected': {
                  color:'#fff',
                  backgroundColor:'rgba(49, 82, 65, 1)',
                }}} 
                >
                {"Other"}
                </MenuItem>
                </CategoryProp>
              </>
            ))}
            {/* Rendering Child Category Props */}
            <div>
              {ChildProp.data?.map((c) => (
                <CategoryProp
                fullWidth 
                inputProps={{
                  sx: {
                    color: '#333',
                    fontSize: '14px',
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    backgroundColor: '#fff',
                    padding:'10px 16px',
                  },
                  }}
                  key={index}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  label={c.name} id="select" select>
                {/* Rendering Child Prop >> Lists */}
                    {c.options?.map((cp) => (
                    <MenuItem 
                    key={cp.id} 
                    value={cp.name}
                    sx={{'&:hover': 
                    {color: '#fff',
                    backgroundColor:'rgba(49, 82, 65, 0.8)',
                    '&.Mui-selected': {
                      color:'#fff',
                      backgroundColor:'rgba(49, 82, 65, 1)',
                    }
                    },
                    '&.Mui-selected': {
                      color:'#fff',
                      backgroundColor:'rgba(49, 82, 65, 1)',
                    }}}
                    >
                  {cp.name}
                  
                </MenuItem>
                  ))}
                    </CategoryProp>
              ))}
            </div>
          </Box>
        ))}
      
      </div>
      </form>
      {/* Searchable Form */}
      </div>

    <button type="button" 
    className="bg-black text-white py-2 px-4 rounded-md font-bold"
    onClick={onAdd}>Submit</button>

    {/* Showing Table of Categories and Props */}
    {RenderTable ? (
      <div className="w-full mt-6">
      <TableContainer component={Paper} sx={{backgroundColor:"#181818"}}>
      <Table aria-label="collapsible table" sx={{backgroundColor:"#181818"}}>
        <TableHead>
          <TableRow sx={{ "& th": { padding: "5px 16px", borderColor:"#4d4d4d"} }}>
            {vProcess.data?.map((x) => (
              <TableCell key={x.id} align="center" sx={{fontWeight:"bold", fontFamily:"sans-serif", color:"#fff", fontSize:"12px", letterSpacing:"1px"}}>{x.name}</TableCell>
            ))}
            {ChildProp.data?.map((k) => (
              <TableCell key={k.id} align="center" sx={{fontWeight:"bold", fontFamily:"sans-serif", color:"#fff", fontSize:"12px", letterSpacing:"1px"}}>{k.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vProcess.data?.map((s) => (
              <TableRow sx={{"& td": {border:0}}} key={s.id}>
                {s.options?.map((sd) => (
                <TableCell align="center" key={sd.id}>
                <b className='font-sans text-white'>{sd.name}</b>
            </TableCell>
            ))}
              </TableRow>
          ))}
        </TableBody>
        </Table>
        </TableContainer>
      </div>
    ) : ("")}
    </>
  )
}

export default CategoryLists;