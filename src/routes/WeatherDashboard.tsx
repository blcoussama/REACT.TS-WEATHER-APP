  import WeatherSkeleton from "@/components/LoadingSkeleton"
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
  import { Button } from "@/components/ui/button"
  import { useGeoLocation } from "@/hooks/UseGeoLocation"
  import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
  import { useEffect } from "react"

  const WeatherDashboard = () => {

    const { locationData, getLocation } = useGeoLocation()
    const { coordinates, error:locationError, isLoading:locationLoading } = locationData
    

    useEffect(() => {
      if (coordinates) {
        console.log("Updated Coordinates:", coordinates);
      }
    }, [coordinates]);

    const handleRefresh = () => {
      getLocation()
      if(coordinates) {
        //reload weather data

      }
    }

    if(locationLoading) {
      return <WeatherSkeleton />
    }

    if(locationError) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Location Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>{locationError}</p>
            <Button variant="outline" onClick={getLocation} className="w-fit">
              <MapPin className="mr-2 h-4 w-4" />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    if(!coordinates) {
      return (
        <Alert>
          <MapPin className="h-4 w-4" />
          <AlertTitle>Location Required</AlertTitle>
          <AlertDescription className="flex flex-col gap-4">
            <p>Please enable location access to see your local weather.</p>
            <Button variant="outline" onClick={getLocation} className="w-fit">
              <MapPin className="mr-2 h-4 w-4" />
              Enable Location
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="space-y-4">
        {/* Favorite Cities */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button variant={"outline"} size={"icon"} onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        {/* Current and Hourly Weather */}
      </div>
    )
  }

  export default WeatherDashboard