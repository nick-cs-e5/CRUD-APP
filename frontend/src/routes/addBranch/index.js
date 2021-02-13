import { h } from 'preact';
import {useEffect, useState} from "preact/hooks";
import style from './style.css';
import TextField from 'preact-material-components/TextField';
import 'preact-material-components/TextField/style.css';
import Radio from 'preact-material-components/Radio';
import Formfield from 'preact-material-components/FormField';
import 'preact-material-components/FormField/style.css';
import 'preact-material-components/List/style.css';
import { createBranch } from './branchapicall';

// Note: `user` comes from the URL, courtesy of our router
const branch = () => {

	const [Branch, setBranch] = useState({
    	branchName:"",
    	addressLine1: "",
    	addressLine2: "",
    	city : "",
    	state : "",
    	pincode: "",
    	phone : "",
    	headquarter : "",
    	branch: "",
    	contactPerson : "",
    	error: "",
    	loading: false,
    	success: false
    })

    const {branchName, addressLine1, addressLine2, city, state , pincode, phone, headquarter, branch, contactPerson, loading, success} = Branch;

    const onSubmit = event => {
    	event.preventDefault();
    	setBranch({...Branch, error: "", loading: true});

    	// Backend Request
    	createBranch({branchName, addressLine1, addressLine2, city, state , pincode, phone, headquarter, branch, contactPerson})
    	.then(data => {
    		if(data.error){
    			setBranch({...Branch, error: data.error})
    		}else{
    			setBranch({
    				...Branch,
    				branchName:"",
    				addressLine1: "",
    				addressLine2: "",
    				city : "",
    				state : "",
    				pincode: "",
    				phone : "",
    				headquarter : "",
    				branch: "",
    				contactPerson : "",
    				success: true
    			})
    		}
    	})
    }

    const handleChange = name => event => {
    	setBranch({...Branch, error: false, [name]: event.target.value});
    }


	return(
		<div className="pl-5 pr-5 pt-5">
		
			<div class="demo-card-wide mdl-card shadow-lg w-100 pb-2 mb-5">
				
				<center>
					<span class="mdl-chip mt-4 mb-4 shadow" style={{backgroundColor: "#424242"}}>
						<span class="mdl-chip__text"><p className="pt-1 pl-3 pr-3" style={{fontSize: 25, color: "white"}}>Branch Form</p></span>
					</span>
					
				</center>
				
			
				<div className="mt-2 mb-2 ml-4 mr-4">
					<p className="pl-1" style={{fontSize: 18}}>Name :</p>
					<TextField outlined value={branchName} onChange={handleChange("branchName")} className="w-100" label="Branch Name" helpertext="Essential 5" type="text" />
					<p className="pt-4 pl-1" style={{fontSize: 18}}>Address :</p>
					<div className="mb-4">
						<TextField outlined value={addressLine1} onChange={handleChange("addressLine1")}  className="w-100" label="Address Line 1" helpertext="Kharadi, Pune" type="text"/>
					</div>
					<div className="mb-4">
						<TextField outlined value={addressLine2} onChange={handleChange("addressLine2")} className="w-100" label="Address Line 2" helpertext="Wogoli, Pune" type="text"/>
					</div>
					<div className="mb-4">
						<TextField outlined value={city} onChange={handleChange("city")} className="w-100" label="City" helpertext="Pune" type="text"/>
					</div>
					<div className="mb-4">
						<TextField outlined value={state} onChange={handleChange("state")} className="w-100" label="State" helpertext="Maharastra" type="text"/>
					</div>
					<div className="mb-4">
						<TextField outlined value={pincode} onChange={handleChange("pincode")} className="w-100" label="Pin Code" helpertext="799005" type="text"/>
					</div>
					<p className="pt-2 pl-1" style={{fontSize: 18}}>Phone :</p>
					<div className="mb-4">
						<TextField outlined value={phone} onChange={handleChange("phone")} className="w-100" label="Phone" helpertext="+91 939393939" type="text"/>
					</div>
					<p className="pt-2 pl-1" style={{fontSize: 18}}>Contact Person :</p>
					<div className="mb-4">
						<TextField outlined value={contactPerson} onChange={handleChange("contactPerson")} className="w-100" label="Name" helpertext="Anik Roy" type="text"/>
					</div>
					<p className="pt-2 pl-1" style={{fontSize: 18}}>Select Type:</p>
					<div className="mb-4 ml-2">
						<Formfield className="pr-3">
							<Radio id="radio-1" name="Basic Options" value={headquarter} onChange={handleChange("headquarter")}/>
							<label for="radio-1" style={{fontSize: 16}}>Headquarter</label>
						</Formfield>
						<Formfield>
							<Radio id="radio-2" name="Basic Options" value={branch} onChange={handleChange("branch")}/>
							<label for="radio-2" style={{fontSize: 16}}>Branch</label>
						</Formfield>
					</div>
					<button onClick={onSubmit} class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent w-100" style={{borderRadius: 20}}>
						Create Branch
					</button>
				</div>	
				
			</div>
		</div>

	)
}

export default branch;
