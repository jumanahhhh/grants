// const GrantManagement = () => {
//     const [grants, setGrants] = useState([]);
//     const [newGrant, setNewGrant] = useState({ name: '', amount: '', deadline: '' });

//     useEffect(() => {
//         fetchGrants(); // Fetch existing grants
//     }, []);

//     const fetchGrants = async () => {
//         const { data } = await axios.get('/api/grants'); // Adjust route
//         setGrants(data);
//     };

//     const handleAddGrant = async () => {
//         await axios.post('/api/grants', newGrant);
//         fetchGrants(); // Refresh list
//     };

//     const handleDeleteGrant = async (id) => {
//         await axios.delete(`/api/grants/${id}`);
//         fetchGrants();
//     };

//     return (
//         <div>
//             <h1>Grant Management</h1>
//             <form>
//                 <input placeholder="Name" onChange={(e) => setNewGrant({ ...newGrant, name: e.target.value })} />
//                 <input placeholder="Amount" onChange={(e) => setNewGrant({ ...newGrant, amount: e.target.value })} />
//                 <input placeholder="Deadline" onChange={(e) => setNewGrant({ ...newGrant, deadline: e.target.value })} />
//                 <button type="button" onClick={handleAddGrant}>Add Grant</button>
//             </form>
//             <ul>
//                 {grants.map((grant) => (
//                     <li key={grant._id}>
//                         {grant.name} - {grant.amount} - {grant.deadline}
//                         <button onClick={() => handleDeleteGrant(grant._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
