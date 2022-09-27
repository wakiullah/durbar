import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Lists.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";


function SmallExample({ users }) {
  const router = useRouter();
  const [numberTerm, setNumberTerm] = useState("");
 

  return (
    <section class="section">
      <div class="container">
        <div className={classes.inputWrapper}>
          <input
            className={classes.input}
            type="text"
            placeholder="Search by Phone Number..."
            onChange={(e) => setNumberTerm(e.target.value)}
          />
        </div>
        <div class="b-table">
          <div class="table-wrapper has-mobile-cards">
            <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>Code No.</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Gas Name</th>
                 
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((val) => {
                    if (numberTerm == "") {
                      return val;
                    } else if (
                      val.name
                        .toLowerCase()
                        .includes(numberTerm.toLowerCase()) ||
                      val.code
                        .toLowerCase()
                        .includes(numberTerm.toLowerCase()) ||
                      val.phone.toLowerCase().includes(numberTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((user) => (
                    <tr
                      className={classes.tableRow}
                      key={user.code}
                      onClick={() => {
                        router.push(`/${user.id}`);
                      }}
                    >
                      <td data-label="code no">{user.code}</td>
                      <td data-label="name">{user.name}</td>
                      <td data-label="phone">{user.phone}</td>
                      <td data-label="address">{user.address}</td>
                      <td data-label="gas name">{user.gasName}</td>
                     
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmallExample;
