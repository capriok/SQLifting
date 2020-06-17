import useFetchData from './useFetchData'

const useUpdatePopulation = () => {
  const { populateData, populateExercises, populateWorkouts } = useFetchData()

  const updatePopulation = (type) => {
    switch (type) {
      case undefined:
        populateData()
        populateExercises()
        populateWorkouts()
        break;
      case 'equipment':
        populateData('equipment')
        break;
      case 'muscle':
        populateData('muscles')
        break;
      case 'exercise':
        populateData('exercises')
        break;
      case 'exercises':
        populateExercises()
        break;
      case 'workouts':
        populateWorkouts()
        break;
      default:
        break;
    }
  }

  return updatePopulation
}

export default useUpdatePopulation