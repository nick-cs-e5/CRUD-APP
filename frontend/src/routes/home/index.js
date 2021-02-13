import { h } from 'preact';
import "./style.css";
import {useEffect, useState} from "preact/hooks";
import { getAllBranch } from '../addBranch/branchapicall';


const Home = () => {

	const [Branch, setBranch] = useState([]);

	const BranchData = () => {
		getAllBranch().then(data => {
			if(data.error){
				console.log(data.error);
			}else{
				setBranch(data);
			}
		})
	}

	useEffect(() => {
		BranchData();
	}, [])

	return(
		<div>
			<span class="mdl-chip mt-4 mt-2 ml-5 mb-4 pb-2 float-left">
				<span class="mdl-chip__text">Total Branches: 28</span>
			</span>

			
			<div className="pl-5 pr-5 pt-3 pb-3">
				<div class="demo-card-wide mdl-card mdl-shadow--2dp w-100">
					<div class="mdl-card__title">
						<h2 class="mdl-card__title-text">Branch Name</h2>
					</div>
					<div class="mdl-card__supporting-text">
						<h5 style={{color: "#616161"}}>Address :</h5>
						<h6>Line 1: Wogoli Road, Pune, Maharastra</h6>
						<h6>Line 2: Gera Road, Pune, Maharastra</h6>
						<h6>City: Pune</h6>
						<h6>State: Maharastra</h6>
						<h6>Pin: 799005</h6>
						<h5 style={{color: "#616161"}}>Phone : +91 8837329430</h5>
						<h5 style={{color: "#616161"}}>Headquarter</h5>
					</div>
					<div class="mdl-card__menu">
						<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
							<span class="material-icons" style={{color: "#d50000"}}>delete</span>
						</button>
						<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
						<span class="material-icons" style={{color: "#00c853"}}>update</span>
						</button>
					</div>
				</div>
			</div>



			{Branch.map((branch) => {
				return(
					<div className="pl-5 pr-5 pt-3 pb-3">
						<div class="demo-card-wide mdl-card mdl-shadow--2dp w-100">
							<div class="mdl-card__title">
								<h2 class="mdl-card__title-text">{branch.branchName}</h2>
							</div>
							<div class="mdl-card__supporting-text">
								<h5 style={{color: "#616161"}}>Address :</h5>
								<h6>{branch.addressLine1}</h6>
								<h6>{branch.addressLine2}</h6>
								<h6>City: {branch.city}</h6>
								<h6>State: {branch.state}</h6>
								<h6>Pin: {branch.pincode}</h6>
								<h5 style={{color: "#616161"}}>Phone : {branch.phone}</h5>
								<h5 style={{color: "#616161"}}>contactPerson: {branch.contactPerson}</h5>
								<h5 style={{color: "#616161"}}>{branch.headquarter}</h5>
								<h5 style={{color: "#616161"}}>{branch.branch}</h5>
							</div>
							<div class="mdl-card__menu">
								<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
									<span class="material-icons" style={{color: "#d50000"}}>delete</span>
								</button>
								<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
								<span class="material-icons" style={{color: "#00c853"}}>update</span>
								</button>
							</div>
						</div>
					</div>
				)
			})}


		</div>
		
	)
}

export default Home;
