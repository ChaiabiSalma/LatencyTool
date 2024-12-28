package projet.latency_tool.service;

public class Geolocation {
    private double latitude;
    private double longitude;

    // Getters et setters
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
    @Override
    public String toString() {
        return "Latitude: " + this.latitude + ", Longitude: " + this.longitude;
    }
}
