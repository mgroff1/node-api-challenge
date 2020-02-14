import React, { useEffect, useState } from "react";
import fetchActions from "../services/getActions";
import {Project} from "./../style/styled";
import {Main} from "./../style/styled";
export default () => {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    fetchActions().then(res => setActions(res.data));
  }, []);

  return (
    <Main>
    <Project>
      <pre>{JSON.stringify(actions, null, 4)}</pre>
    </Project>

        < /Main>
  );
};
