import { useStateValue } from '../state'
import axios from 'axios'

const useFetchData = () => {
  const [{ user, data }, dispatch] = useStateValue()
  const queryParams = { params: { user_id: user.details.user_id } }

  const populateData = async (type) => {
    switch (type) {
      case undefined:
        try {
          await axios
            .all([
              axios.get(process.env.REACT_APP_GET + '/equipment', queryParams),
              axios.get(process.env.REACT_APP_GET + '/muscles', queryParams),
              axios.get(process.env.REACT_APP_GET + '/exercises', queryParams)
            ])
            .then(
              axios.spread((...res) => {
                data.equipment = res[0].data
                data.muscles = res[1].data
                data.exercises = res[2].data
                data.equipment.forEach(item => {
                  item.checked = false
                  item.name = item.name.toLowerCase()
                });
                data.muscles.forEach(item => {
                  item.checked = false
                  item.name = item.name.toLowerCase()
                });
                data.exercises.forEach(item => {
                  item.checked = false
                  item.name = item.name.toLowerCase()
                });
                dispatch({
                  type: 'DBaction',
                  data: {
                    equipment: data.equipment.sort((a, b) => (a.name > b.name) ? 1 : -1),
                    muscles: data.muscles.sort((a, b) => (a.name > b.name) ? 1 : -1),
                    exercises: data.exercises.sort((a, b) => (a.name > b.name) ? 1 : -1)
                  }
                })
              }))
            .catch(e => console.error(e.message))
        }
        catch (error) {
          console.log(error, 'Could not populate data');
        }
        if (type !== undefined) console.log('type', undefined);
        break;
      case 'equipment':
        axios
          .get(process.env.REACT_APP_GET + '/equipment', queryParams)
          .then(res => {
            res.data
              .forEach(item => {
                item.checked = false
                item.name = item.name.toLowerCase()
              });
            dispatch({
              type: 'DBaction',
              data: { ...data, equipment: res.data.sort((a, b) => (a.name > b.name) ? 1 : -1) }
            })
          })
          .catch(e => console.error(e.message))
        break;
      case 'muscles':
        axios
          .get(process.env.REACT_APP_GET + '/muscles', queryParams)
          .then(res => {
            res.data
              .forEach(item => {
                item.checked = false
                item.name = item.name.toLowerCase()
              });
            dispatch({
              type: 'DBaction',
              data: { ...data, muscles: res.data.sort((a, b) => (a.name > b.name) ? 1 : -1) }
            })
          })
          .catch(e => console.error(e.message))
        break;
      case 'exercises':
        axios
          .get(process.env.REACT_APP_GET + '/exercises', queryParams)
          .then(res => {
            res.data
              .forEach(item => {
                item.checked = false
                item.name = item.name.toLowerCase()
              });
            dispatch({
              type: 'DBaction',
              data: { ...data, exercises: res.data.sort((a, b) => (a.name > b.name) ? 1 : -1) }
            })
          })
          .catch(e => console.error(e.message))
        break;
      default:
        break;
    }
  }

  const populateExercises = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_GET + '/builtexercises', queryParams)
        .then(res => {
          res.data
            .forEach(item => {
              item.checked = false
              item.name = item.name.toLowerCase()
            });
          dispatch({
            type: 'EXaction',
            exercises: res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
          })
        })
        .catch(e => console.error(e.message))
    } catch (error) {
      console.log(error, 'Could not populate data');
    }
  }

  const populateWorkouts = async () => {
    try {
      await axios
        .get(process.env.REACT_APP_GET + '/builtworkouts', queryParams)
        .then(res => {
          res.data
            .forEach(item => {
              item.checked = false
              item.name = item.name.toLowerCase()
            });
          dispatch({
            type: 'WOaction',
            workouts: res.data.sort((a, b) => (a.name > b.name) ? 1 : -1)
          })
        })
        .catch(e => console.error(e.message))
    } catch (error) {
      console.log(error, 'Could not populate data');
    }
  }

  return {
    populateData,
    populateExercises,
    populateWorkouts
  }
}

export default useFetchData
