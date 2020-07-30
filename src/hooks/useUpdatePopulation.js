import useFetchData from './useFetchData'

const useUpdatePopulation = () => {
  const { populateCompositions, populateComposites } = useFetchData()

  const updatePopulation = (type) => {
    switch (type) {
      case undefined:
        populateCompositions()
        populateComposites()
        break;
      case 'compositions':
        populateCompositions()
        break;
      case 'composites':
        populateComposites()
        break;
      default:
        break;
    }
  }

  return updatePopulation
}

export default useUpdatePopulation