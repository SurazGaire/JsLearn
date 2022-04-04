import "../css/style.scss";

// Our modules / classes
import MobileMenu from "./modules/MobileMenu";
import HeroSlider from "./modules/HeroSlider";
import Search from "./modules/Search";

// Instantiate a new object using our modules/classes
const mobileMenu = new MobileMenu();
const heroSlider = new HeroSlider();
const search = new Search();

wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
	title: "Are You Paying Attention?",
	icon: "smiley",
	category: "common",
	attributes: {
		skyColor: { type: "string" },
		grassColor: { type: "string" },
	},
	edit: function (props) {
		function updateSkyColor(event) {
			props.setAttributes({ skyColor: event.target.value });
		}

		function updateGrassColor(event) {
			props.setAttributes({ grassColor: event.target.value });
		}

		return (
			<div>
				<input
					type="text"
					placeholder="sky color"
					value={props.attributes.skyColor}
					onChange={updateSkyColor}
				/>
				<input
					type="text"
					placeholder="grass color"
					value={props.attributes.grassColor}
					onChange={updateGrassColor}
				/>
			</div>
		);
	},
	save: function (props) {
		return null;
	},
});
