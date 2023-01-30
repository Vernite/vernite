// describe('Service decorator', () => {
//   beforeEach(() => {
//     const testBed = TestBed.configureTestingModule({
//       imports: [HttpClientModule],
//       providers: [ApiService],
//     });

//     const WINDOW = window as any;
//     WINDOW.ngRef = WINDOW.ng.getInjector();
//     console.log(WINDOW.ngRef);
//   });

//   it('NgRef should be defined', () => {
//     const WINDOW = window as any;
//     expect(WINDOW.ngRef).toBeDefined();
//   });

//   it('should push service to global array', () => {
//     const WINDOW = window as any;

//     @Service()
//     class TestService {}

//     expect((window as any).SERVICES).toBeDefined();
//   });
// });
