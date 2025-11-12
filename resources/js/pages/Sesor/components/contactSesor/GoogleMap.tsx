
const GoogleMap = ({link}) => {
    
    return (
        <div className="relative aspect-video w-full">
            <iframe
                src={link}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute top-0 left-0 h-full w-full"
            ></iframe>
        </div>
    );
};

export default GoogleMap;
