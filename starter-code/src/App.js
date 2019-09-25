import React from "react";
import "./App.css";
import users from "./users.json";

const userData = users;

class App extends React.Component {
  state = {
    userData: userData,
    search: "",
    isTeacher: true,
    isStudent: true
  };

  handleChange = event => {
    let value = event.target.value.toLowerCase();
    console.log(value);
    this.setState({
      search: value
    });
  };

  handleCheckChange = event => {
    let checked = event.target.checked;
    let name = event.target.name;
    this.setState({
      [name]: checked
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const filteredUsers = [...userData].filter(el => {
      return (
        el.lastName.toLowerCase().includes(this.state.search) ||
        el.firstName.toLowerCase().includes(this.state.search)
      );
    });
    const checkedUsers = [...filteredUsers].filter(el => {
      return this.state.isTeacher || this.state.isStudent;
    });
    this.setState({
      userData: checkedUsers
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Ironbook</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <label htmlFor="isTeacher">Teacher</label>

          <input
            type="checkbox"
            name="isTeacher"
            id="isTeacher"
            value={this.state.isTeacher}
          />
          <label htmlFor="isStudent">Student</label>
          <input
            type="checkbox"
            name="isStudent"
            id="isStudent"
            value={this.state.isStudent}
          />
          <button type="submit">Submit</button>
        </form>
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
            {[...this.state.userData].map(el => {
              return (
                <tr key={el.lastName}>
                  <td>{el.firstName}</td>
                  <td>{el.lastName}</td>
                  <td>{el.campus}</td>
                  <td>{el.role}</td>
                  <td>
                    {el.linkedin ? (
                      <a href={el.linkedin}>
                        <img
                          height="10px"
                          src="linkedin.png"
                          alt="linkedIn link"
                        />
                      </a>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

// users = [...this.state.userData].map(el => {
//   return (
//     <tr key={el.lastName}>
//       <td>{el.firstName}</td>
//       <td>{el.lastName}</td>
//       <td>{el.campus}</td>
//       <td>{el.role}</td>
//       <td>
//         {el.linkedin ? (
//           <a href={el.linkedin}>
//             <img height="10px" src="linkedin.png" alt="linkedIn link" />
//           </a>
//         ) : (
//           ""
//         )}
//       </td>
//     </tr>
//   );
// });
