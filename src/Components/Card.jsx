const cardStyles = {
  container: {
    display: "flex",
    height: 200,
    width: 600,
    boxShadow: "0 0 3px 2px #cec7c759",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  profilePicture: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "orange",
    // color: "white",
    height: 140,
    width: 140,
    borderRadius: "50%",
    padding: 10,
    // fontWeight: "bold",
  },
  bio: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
  },
  quote: {
    fontStyle: "italic",
  },
}

const Card = ({ text, name, artist, image }) => {
  return (
    <div style={cardStyles.container}>
      <img style={cardStyles.profilePicture} src={image} />
      <div style={cardStyles.bio}>
        <p style={cardStyles.userName}>
          {name} - {artist}
        </p>
        <p style={cardStyles.quote}>"{text}"</p>
      </div>
    </div>
  )
}

export default Card
