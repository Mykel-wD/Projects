import React from "react";
function App() {
  const colors = [
    "#FF5733", // vibrant orange
    "#FFC300", // bright yellow
    "#C70039", // deep red
    "#900C3F", // dark magenta
    "#581845", // deep purple
    "#A9DF9C", // light green
    "#F4D03F", // golden yellow
    "#273746", // dark blue-gray
    "#9B59B6", // deep purple
    "#1ABC9C", // bright teal
    "#E74C3C", // bright red
    "#2C3E50", // dark blue-gray
    "#F7DC6F", // bright yellow
    "#D35400", // burnt orange
    "#8E44AD", // deep purple
    "#16A085", // bright teal
    "#F1C40F", // bright yellow
    "#2980B9", // bright blue
    "#2ECC71", // bright green
    "#3498DB", // bright blue
  ];
  return <Quote colors={colors} />;
}
class Quote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
      quotes: [],
      colors: this.props.colors,
      color: "#900C3F",
      quote: "Be the change you wish to see in the world.",
      author: "Sasha Grey",
    };
    this.change = this.change.bind(this);
  }
  componentDidMount() {
    const fetchData = async ()=> {
      try {
        const response = await fetch("http://localhost:3000/quotedata");
        const data = await response.json();
        this.setState({ quotes: data.quotes, authors: data.authors });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }
  change(e) {
    const index = Math.floor(Math.random() * 20);
    const quote = this.state.quotes[index];
    const author = this.state.authors[index];
    const color = this.state.colors[index];
    this.setState({ quote: quote, author: author, color: color });
    e.target.style.transform = "translate(5px,5px)";
    setTimeout(() => {
      e.target.style.transform = "translate(0)";
    }, 50);
  }
  render() {
    return (
      <div id="container">
        <h1 id="title" style={{ color: this.state.color }}>
          Quotes generator
        </h1>
        <div id="quote-box" style={{ backgroundColor: this.state.color }}>
          <div id="quote">{this.state.quote}</div>
          <div id="author">
            <button id="change" onClick={this.change}>
              Change!
            </button>
            <div>- {this.state.author}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
