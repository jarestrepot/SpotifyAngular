import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('Service de login AuthService', () => {
  let service: AuthService;
  // let mockUser: any = (mockRaw as any).dafault;
  // Utilizamos el Spy de Jasmine
  // let httpClientSpy: { post: jasmine.Spy }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    // ** Cogemos el httpClient del servicio
    // httpClientSpy = jasmine.createSpyObj('httpClient', ['post'])
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('It must return a value with data and tokenSession', (done:DoneFn) => {
  //   const mockUserOk = { email:'test@test.com', password: 'Aplicaciones01'}
  //   const mockResponse = {
  //     data: {},
  //     tokenSession: '1wkdjkdxs'
  //   }

  //   service.sendCredencials(mockUserOk.email, mockUserOk.password)
  //     .subscribe(
  //       responseAPI => {
  //         const getProperties = Object.keys(responseAPI);
  //         expect(getProperties).toContain('data')
  //         expect(getProperties).toContain('tokenSession')
  //         done();
  //       }
  //     )
  // });
});
