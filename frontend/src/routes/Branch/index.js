import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import { getAllBranch, createBranch, deleteBranch, updateBranch } from './helper/branchapicall';
import Pagination from './pagination';

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Radio, RadioGroup, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
	appBar: {
	  position: 'relative',
	},
	title: {
	  marginLeft: theme.spacing(2),
	  flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});


const Home = () => {

		const classes = useStyles();
		
		const [open, setOpen] = useState(false);

		// Hook's call for implementing Update & Create operations in same Form
		const [SwitchAction, setSwitchAction] = useState({
			FormTitle: "",
			actionButton: "",
			action: 0,
			branchId: ""
		});

		const {FormTitle, action, branchId, actionButton} = SwitchAction;

		// OnClick action for opening "Branch Form" to create branch
		const handleClickCreateOpen = () => {
			setSwitchAction({
				...SwitchAction,
				FormTitle: "Branch Form",
				actionButton: "create",
				action: 0,
			});
			setOpen(true);
		};

		// OnClick action for opening "Branch Form" to update branch
		const handleClickUpdateOpen =branch=> {
			setSwitchAction({
				...SwitchAction,
				FormTitle: "Branch Form",
				actionButton: "update",
				action: 1,
				branchId:branch._id
			});
			//GetAll data of a particular branch by branchId.
			setBranchData({
				...BranchData,
			    branchName: branch.branchName,
				addressLine1: branch.addressLine1,
				addressLine2: branch.addressLine2,
				city : branch.city,
				state : branch.state,
				pincode: branch.pincode,
				phone : branch.phone,
				type: branch.type,
				contactPerson : branch.contactPerson,
			})
			setOpen(true);
		};
	

		const handleClose = () => {
			setOpen(false);
		};
	

		const [Branch, setBranch] = useState([]);

		// Getting All Branches information using async & await function
		const GetBranchData = async() => {
			let res = await getAllBranch();
			setBranch(res.branchs);
		}
	
		// Total Branches
		const TotalBranch = Branch.length;
	
		// Pagination
		const [currentPage, setCurrentPage] = useState(1);
		const [postPerPage] = useState(20);
	
		const indexOfLastPost = currentPage * postPerPage;
		const indexOfFirstPost = indexOfLastPost - postPerPage;
		// Filtering the number of Branch to be displayed on a particular screen
		const CurrentPosts = Branch.slice(indexOfFirstPost, indexOfLastPost);
	
		const paginate = (pageNumber) => setCurrentPage(pageNumber);

		
		const [BranchData, setBranchData] = useState({
			branchName:"",
			addressLine1: "",
			addressLine2: "",
			city : "",
			state : "",
			pincode: "",
			phone : "",
			type: "",
			contactPerson : "",
			error: "",
			loading: false,
			success: false
		});
	
		const {branchName, addressLine1, addressLine2, city, state , pincode, phone, type, contactPerson, loading, success} = BranchData;
	
		// Create branch operation's
		const onCreate = event => {
			event.preventDefault();
			setBranchData({...BranchData, error: "", loading: true});
	
			// Backend POST request
			createBranch({branchName, addressLine1, addressLine2, city, state , pincode, phone, type, contactPerson})
			.then(data => {

				if( phone == "" || branchName == "" || addressLine1 == "" || addressLine2 == "" || city == "" || state == "" || pincode == "" || type == "" || contactPerson == ""){
					alert("Please Fill Up Every fields");
				}else{
					setBranchData({
						...BranchData,
						branchName:"",
						addressLine1: "",
						addressLine2: "",
						city : "",
						state : "",
						pincode: "",
						phone : "",
						type : "",
						contactPerson : "",
						success: true
					})
					handleClose();
					GetBranchData();
				}
			})	
			
		}

		// Update branch operation's
		const onUpdate = event => {
			event.preventDefault();
			setBranchData({...BranchData, error: "", loading: true});
	
			// Backend Request
			updateBranch(branchId,{branchName, addressLine1, addressLine2, city, state , pincode, phone, type, contactPerson})
			.then(data => {
				setBranchData({
					...BranchData,
					branchName:"",
					addressLine1: "",
					addressLine2: "",
					city : "",
					state : "",
					pincode: "",
					phone : "",
					type : "",
					contactPerson : "",
					success: true
				})
				handleClose();
				GetBranchData();
			})
		}
	
		// Taking branch data from the input fields
		const handleChange = name => event => {
			setBranchData({...BranchData, error: false, [name]: event.target.value});
		}

		// Branch Delete operation
		const BranchDelete = branchId => {
			deleteBranch(branchId).then(data => {
				if(data.error){
					console.log(data.error);
				}else{
					GetBranchData();
				}
			});
		};
	
		useEffect(() => {
			GetBranchData();
		}, [])
	
		return(
			<div>
				
				<div className="row mr-1 mt-4  mb-4 pb-2 float-right">
					<span class="mdl-chip mt-1">
						<span class="mdl-chip__text">Total Branches: {TotalBranch}</span>
					</span>
					{/* Button for opening form to create branch */}
					<Fab onClick={handleClickCreateOpen} style={{outline: "none"}}  className="ml-4 mr-5" size="small" color="secondary" aria-label="add">
						<AddIcon />
					</Fab>
				</div>

				{/* Update & Create Dialog box */}
				<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
					<AppBar className={classes.appBar} style={{backgroundColor: "#0091ea", position: "fixed"}}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" style={{outline: "none"}} >
						<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{FormTitle}
						</Typography>
						{/* Button SwitchAction based on action value */}
						{action===0?(
							<Button autoFocus color="inherit" onClick={onCreate} style={{outline: "none"}} >
							{actionButton}
						   </Button>
						 ):(
							<Button autoFocus color="inherit" onClick={onUpdate} style={{outline: "none"}} >
							{actionButton}
						   </Button>
						 )}
					</Toolbar>
					</AppBar>
					{/* Update & Create Form */}
					<List className="pl-4 pr-4">
						<p className="pl-1 pt-5 mt-5" style={{fontSize: 18, color: "#0091ea"}}>Name :</p>
						<TextField id="outlined-basic" variant="outlined" value={branchName} onChange={handleChange("branchName")} className="w-100" label="Branch Name" helpertext="Essential 5" type="text" />
						<p className="pt-4 pl-1" style={{fontSize: 18, color: "#0091ea"}}>Address :</p>
						<div className="mb-4">
							<TextField id="outlined-basic" variant="outlined" outlined value={addressLine1} onChange={handleChange("addressLine1")}  className="w-100" label="Address Line 1" helpertext="Kharadi, Pune" type="text"/>
						</div>
						<div className="mb-4">
							<TextField id="outlined-basic" variant="outlined" value={addressLine2} onChange={handleChange("addressLine2")} className="w-100" label="Address Line 2" helpertext="Wagoli, Pune" type="text"/>
						</div>
						<div className="mb-4">
							<TextField id="outlined-basic" variant="outlined" value={city} onChange={handleChange("city")} className="w-100" label="City" helpertext="Pune" type="text"/>
						</div>
						<div className="mb-4">
							<TextField id="outlined-basic" variant="outlined" value={state} onChange={handleChange("state")} className="w-100" label="State" helpertext="Maharastra" type="text"/>
						</div>
						<div className="mb-4">
							<TextField id="outlined-basic" variant="outlined" value={pincode} onChange={handleChange("pincode")} className="w-100" label="Pin Code" helpertext="799005" type="number"/>
						</div>
						<p className="pt-2 pl-1" style={{fontSize: 18, color: "#0091ea"}}>Phone :</p>
						<div className="mb-4">
							<TextField id="outlined-basic" variant="outlined" value={phone} onChange={handleChange("phone")} className="w-100" label="Phone" helpertext="+91 939393939" type="number" />
						</div>
						<p className="pt-2 pl-1" style={{fontSize: 18, color: "#0091ea"}}>Contact Person :</p>
						<div className="mb-4">
							<TextField id="outlined-basic" variant="outlined" value={contactPerson} onChange={handleChange("contactPerson")} className="w-100" label="Name" helpertext="Anik Roy" type="text"/>
						</div>
						<p className="pt-2 pl-1" style={{fontSize: 18, color: "#0091ea"}}>Select Type:</p>
						<div className="mb-4 ml-2">
							<RadioGroup  className="pr-3" onChange={handleChange("type")}>

								<div className="row">
									<Radio id="radio-1" name="typeof" value="Headquarter" />
									<label for="radio-1" className="pt-3" style={{fontSize: 16}}>Headquarter</label>
								</div>

								<div className="row">
									<Radio id="radio-2" name="typeof" value="Branch"/>
									<label for="radio-2" className="pt-3" style={{fontSize: 16}}>Branch</label>
								</div>
								
							</RadioGroup>
						</div>
					</List>
				</Dialog>
				{/* Getting 20 Branch Informations per page using "map" function */}
				{CurrentPosts.map((branch, index) => {
					return(
						<div key={index}>
							<div className="pl-5 pr-5 pt-3 pb-3">
								<div class="demo-card-wide mdl-card mdl-shadow--2dp w-100">
									<div class="mdl-card__title">
										<h2 class="mdl-card__title-text">{branch.branchName}</h2>
									</div>
									<div class="mdl-card__supporting-text">
										<h5 style={{color: "#616161"}}>Address :</h5>
										<h6>Line-1 : {branch.addressLine1}</h6>
										<h6>Line-2 : {branch.addressLine2}</h6>
										<h6>City : {branch.city}</h6>
										<h6>State : {branch.state}</h6>
										<h6>Pin : {branch.pincode}</h6>
										<h5 style={{color: "#616161"}}>Phone : {branch.phone}</h5>
										<h5 style={{color: "#616161"}}>Contact Person : {branch.contactPerson}</h5>
										<h5 style={{color: "#616161"}}>Type : {branch.type}</h5>
									</div>
									<div class="mdl-card__menu">
										{/* Button for opening Update form of branch */}
										<button onClick={() => handleClickUpdateOpen(branch)} class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" style={{outline: "none"}}>
											<span class="material-icons" style={{color: "#00c853"}}>update</span>
										</button>
										{/* Button for Deleting branch */}
										<button onClick={() => BranchDelete(branch._id)} class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect ml-4" style={{outline: "none"}}>
											<span class="material-icons" style={{color: "#d50000"}}>delete</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					)
				})}
	
				{/* Pagination View */}
				<div className="mt-4 mr-5 float-right row">
					<p className="pr-2 pt-1" style={{color: "#039be5"}}>Pages : </p>
					<Pagination postPerPage={postPerPage} totalPosts={TotalBranch} paginate={paginate}/>
				</div>

			</div>
		
	)
}

export default Home;
