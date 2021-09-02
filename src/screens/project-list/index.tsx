import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouceParam = useDebounce(param, 400);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObject(debouceParam) }).then(setList);
  }, [debouceParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};
