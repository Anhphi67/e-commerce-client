import React, { useState, useEffect } from 'react';
import instance from "../https";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import {
    useHistory
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Navbar({ fixed }) {
    const classes = useStyles();
    let history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [menus, setMenu] = React.useState({ result: [] });
    useEffect(() => {
        const fetchData = async () => {
            instance.get(
                '/ProductCategory/GetUiList',
            ).then(res => {
                setMenu(res.data);
            })
                .catch(err => {
                })

        };
        fetchData();
    }, []);
    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
    return (
        <>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3  mb-3">
                <div className="px-2 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static  lg:block lg:justify-start">
                        <button
                            className="flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div
                                className={`${genericHamburgerLine} ${isOpen
                                    ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                                    }`}
                            />
                            <div
                                className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                                    }`}
                            />
                            <div
                                className={`${genericHamburgerLine} ${isOpen
                                    ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                                    : "opacity-50 group-hover:opacity-100"
                                    }`}
                            />
                        </button>
                    </div>
                </div>

            </nav>
            
            <div className={isOpen?"block absolute top-full h-auto z-50 px-2 w-94/100 left-3/100":"hidden"}>
                {menus.result.map(item => (
                    <Accordion key={item.id} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className="h-0 hover:bg-gray-400"
                        >
                            <Typography className={classes.heading} onClick={()=>{history.push('/list/id/' + item.id)}}>{item.name}</Typography>
                        </AccordionSummary>
                        {item.subCategories.map(sub => (
                            <div key={sub.id} className="hover:bg-gray-200 ml-4">
                                <a className="text-left block borde rounded py-2 px-4 hover:bg-gray-400" onClick={()=>{history.push('/list/id/' + sub.id) 
                                setIsOpen(false)}}> {"-> "+sub.name}</a>
                            </div>
                        ))}
                    </Accordion>
                ))}
            </div>
        </>
    );
}