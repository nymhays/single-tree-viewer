import React from "react";
import Tree from "react-tree-graph";
import clone from "clone";

import { useState, useDispatchState, ActionType } from "../contred/index";

interface Node {
  name: string;
  className?: any;
  children: Node[] | never[];
}

function TreeContainer({ data }: { data: Node }) {
  const dispatch = useDispatchState();
  const { searchTerm, activeNode, height, width } = useState();

  function handleClick(_: undefined, nodeName: string) {
    dispatch({ type: ActionType.SET_ACTIVE_NODE, payload: nodeName });
  }

  function getRoot(node: Node): Node | false {
    let newNode: Node;
    if (node.name === activeNode) {
      return node;
    }
    for (let i = 0; i < node.children.length; i++) {
      let childNode: Node | false = getRoot(node.children[i]);
      if (childNode) {
        return (newNode = childNode);
      }
    }
    return false;
  }

  function buildSubTree(root: Node) {
    let newChildren = [];

    for (let i = 0; i < root.children.length; i++) {
      let child = buildSubTree(root.children[i]);
      if (child) {
        newChildren.push(child);
      }
    }

    if (newChildren.length > 0) {
      root.children = newChildren;
    }

    if (
      newChildren.length > 0 ||
      root.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    ) {
      return root;
    }
    return null;
  }

  function setClassName(node: Node) {
    node.children.forEach(setClassName);

    if (!searchTerm) {
      console.log("object");
      return;
    }

    node.className =
      node.name.toLowerCase().indexOf(searchTerm) === -1
        ? "node searchExcluded"
        : "node searchIncluded";
  }

  let root = activeNode ? getRoot(data) : data;

  root = clone(root);

  if (searchTerm) {
    //@ts-ignore
    root = buildSubTree(root) || root;
  }

  //@ts-ignore
  setClassName(root);

  return (
    <Tree
      animated
      data={root}
      height={height}
      width={width}
      gProps={{
        className: "node",
        onClick: handleClick,
      }}
      steps={30}
    />
  );
}

export default TreeContainer;
