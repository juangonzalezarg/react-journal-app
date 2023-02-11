import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dn3br0y77', 
    api_key: '424886448512491', 
    api_secret: 'HzcJnbr1eiyGHN6j5kSc6RHriTM',
    secure: true
  });

describe('Pruebas en fileUpload', () => { 
    
    test('debe de subir el archivo correctamente a cloudinary', async() => { 

        const imageUrl = 'https://image.shutterstock.com/image-vector/vector-creative-illustration-cosmonaut-spacesuit-260nw-1680589189.jpg';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');

        await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
            resource_type: 'image'
        });

     });

     test('debe de retornar null', async() => { 
        
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );

      });

 });