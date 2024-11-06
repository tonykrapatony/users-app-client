const checkFriends = (accepted: string[], requests: string[], id: string) => {
  if (accepted.includes(id) || requests.includes(id)) {
    return true
  } else {
    false
  }
}

export default checkFriends