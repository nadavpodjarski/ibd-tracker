import React, { FC, useState } from "react";
import { Direction } from "../../../../main/types";
import { Select, Button, IconButton, Typography, Grid, MenuItem, TextareaAutosize } from '@material-ui/core'
import MealComponent from '../meal-component'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { colors } from '../../../../main/theme'

import { dictionary } from '../../../../main/languages/app-dictionary';
import * as utils from '../../utils'

import {useDatePicker} from '../../../../common/hooks/useDatePicker'
import {useSelector} from 'react-redux'

const AddDishModalContent: FC<Direction & { handleOpen: () => void }> = ({ direction, handleOpen }) => {
    const {DateTimePicker} = useDatePicker();
    const {chosenLanguage} = useSelector((state:any) => state.languages)
    const [state, setState] = useState({
        mealtype: dictionary.foodTracker.modalMealsSelect[chosenLanguage.const][0].value,
        mealComponents: [utils.makeNewMealComponent()],
        comments:"",
        timestamp: Date.now(),
    });


    const addMealComponentHandler = () => {
        const newComponent = utils.makeNewMealComponent()
        setState(prevState => ({
            ...prevState,
            mealComponents: [newComponent, ...prevState.mealComponents] 
        }))
    }

    const deleteMealComponentHandler = (id: string) => {
        const newComponent = utils.makeNewMealComponent()
        setState(prevState => ({
            ...prevState,
            mealComponents: prevState.mealComponents.length > 1 ? [...prevState.mealComponents.filter(comp => comp.id !== id)] : [newComponent]
        }))
    }


    const changeMealComponentHandler = (event:(React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) | (React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>), id: string) => {
        const {name:property, value}  = event.target;
        const mealComponents = [...state.mealComponents]
        const selectedComponent = mealComponents.find(comp => comp.id === id);
        Object.assign(selectedComponent, { [property as string]: value });
        setState(prevState => ({
            ...prevState,
            mealComponents
        }))
    }

    const changeCommentsHandler = (event:(React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) ) => {
     const {value} = event.target
     setState(prevState => ({
         ...prevState,
            comments:value
     }))
    }

    const mealTypeChangeHandler = (event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
       setState(prevState => ({
           ...prevState,
           mealtype:event.target.value as string
       }))
    }


    const mealTimeChangeHandler = (date:Date | null) => {
        const mealTimeStamp = date?.getTime()
        if(mealTimeStamp){
        setState(prevState => ({
            ...prevState,
            timestamp:mealTimeStamp
        }))
    }
    }

    const doneHandler = () => {
        handleOpen();
        console.log(state)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            {/*Meal Type*/}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0" }}>
                <Typography variant="h4" style={{ fontWeight: "bold" }} >Select Meal</Typography>
                <Select variant="outlined" value={state.mealtype} onChange={mealTypeChangeHandler}>
              {dictionary.foodTracker.modalMealsSelect[chosenLanguage.const].map(item => {
                  return <MenuItem value={item.value} >{item.const}</MenuItem>
                    })}
                </Select>
            </div>

            {/*Meal Components*/}
            <div style={{ display: "flex", alignItems: "center", padding: "8px 0" }}>
                <Typography>Add Component</Typography>
                <div>
                    <IconButton onClick={addMealComponentHandler} >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </div>
            </div>

            <Grid container spacing={3}>
            {state.mealComponents.map((comp, i) => {
                return <Grid item xs={12} md={6}><MealComponent direction={direction} component={comp} deleteHandler={(event) => deleteMealComponentHandler(comp.id)} onChange={(event) => changeMealComponentHandler(event, comp.id)} /></Grid>
            })}
            </Grid>

            <div style={{paddingTop:"16px"}}>
            <div style={{padding:"8px 0"}}>
            <Typography>Comments</Typography>
            </div>
            <div style={{padding:"16px 0"}}>
            <TextareaAutosize rowsMax={8} rowsMin={6}  style={{minWidth:"100%", maxWidth:"100%", padding:"16px", fontSize:"18px",minHeight:"100px",  fontFamily:"Poppins", maxHeight:"100px"}} onChange={(event) => changeCommentsHandler(event)}/>
            </div>
            </div>

            {/*Meal Date*/}
            <Grid container  direction="column" justify="center" style={{padding:"16px 0 40px 0"}}>
                <Grid item style={{padding:"8px 0"}}>
                    <Typography>Set Date & Time</Typography>
                </Grid>
                <Grid item style={{padding:"16px 0"}}>
                    <DateTimePicker  onChange={mealTimeChangeHandler}/>
                </Grid>
            </Grid>

            {/*Action Buttons*/}
            <Grid container spacing={3}>
                <Grid item container xs={6} justify="flex-end">
                    <Button style={{ background: "white", color: colors.tourquize, border: `1px solid ${colors.tourquize}`, width: "80px" }} onClick={handleOpen}>
                        Cancel
            </Button>
                </Grid>
                <Grid item container xs={6} justify="flex-start">
                    <Button style={{ background: colors.tourquize, color: "white", width: "100px" }} onClick={() => doneHandler()} >
                        Done
            </Button>
                </Grid>
            </Grid>

        </div>
    );
};

export default AddDishModalContent;