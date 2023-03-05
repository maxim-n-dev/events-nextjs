

function UserProfilePage(props) {
	return (
		<div>
			<h1>User {props.username}</h1>
		</div>
	);
}
export default UserProfilePage;

export async function getServerSideProps(context) {

  const { params, req, res } = context;

  return {
    props: {
      username: 'Max'
    }
  }
}
