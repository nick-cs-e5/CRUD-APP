import { h } from 'preact';
import { Link, Router } from 'preact-router';
import Branch from '../routes/Branch/index'; 

const App = () => (
	<div id="app">
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
			<div class="mdl-layout__drawer shadow">
				<center>
					<p className="pt-4 pb-2" style={{fontSize: 20, color: "#0091ea", fontWeight: "bold"}}>Company Branch</p>
				</center>
				<nav class="mdl-navigation">
				<a class="mdl-navigation__link shadow-sm" href="/" style={{color: "#000000", fontSize: 16, textDecoration: "none"}}>Branches</a>
				</nav>
			</div>
			<main class="mdl-layout__content">
				<div class="page-content">

				{/* Calling branch in the home page of the dashboard */}
				<Router>
					<Branch path="/" /> 
				</Router>
				</div>
			</main>
		</div>
	</div>
)

export default App;
