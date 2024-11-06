const checkFriends = (accepted: string[], requests: string[], id: string) => {
  return accepted.includes(id) || requests.includes(id);
}

export default checkFriends