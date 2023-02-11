import { loginWithEmailPassword, logoutFirebase, singInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures'

jest.mock('../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => { 
    
    const dispatch = jest.fn();
    
    beforeEach( () => jest.clearAllMocks() );

    test('debe de invocar el checkingCredentials', async() => { 
        
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toBeCalledWith( checkingCredentials() );

     });

     test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => { 

        const loginData = { ok: true, ...demoUser }
        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      });

      test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => { 

        const errorMessage = 'Un error en google';
        const loginData = { ok: false, errorMessage }
        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( errorMessage ) );

      });

      test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Éxito', async() => { 

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: demoUser.password };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( { ...demoUser } ) );

       });

       test('startLogout debe de llamar logoutFirebase, clearNotesLogout y logout', async() => { 

            await startLogout()( dispatch );

            expect( logoutFirebase ).toHaveBeenCalled();
            expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
            expect( dispatch ).toHaveBeenCalledWith( logout( {} ) );

        });
 });